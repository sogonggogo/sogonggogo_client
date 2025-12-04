"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import OrderCard from "@/components/prev-order/OrderCard";
import OrderDetailModal from "@/components/prev-order/OrderDetailModal";
import { OrderHistory, addOrderHistory } from "@/utils/orderHistoryStorage";
import { dinnerMenus } from "@/data/menus";
import { servingStyles, ServingStyleType } from "@/data/styles";
import { getItemsForMenu, SelectedItem } from "@/data/additionalOptions";
import { saveOrders } from "@/utils/orderStorage";
import { orderApi, OrderResponse } from "@/services/orderApi";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.headerHeight};
  padding-left: ${({ theme }) => theme.spacing.container};
  padding-right: ${({ theme }) => theme.spacing.container};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.sizes.heroWidth};
  justify-self: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

// Helper function to format date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

// Helper function to format delivery date
const formatDeliveryDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
};

// Helper function to convert OrderHistory to Order format
const convertToOrderCardFormat = (history: OrderHistory) => {
  // Get all menu names and items
  const menuNames = history.orders
    .map((order) => {
      const menu = dinnerMenus.find((m) => m.id === order.menuId);
      return menu?.name || "알 수 없는 메뉴";
    })
    .join(", ");

  // Get all items and merge duplicates
  const itemsMap = new Map<string, number>();
  const stylesSet = new Set<string>();

  history.orders.forEach((order) => {
    const style = servingStyles[order.style];
    if (style) {
      stylesSet.add(style.name);
    }

    const availableItems = getItemsForMenu(order.menuId);
    const selectedItems = order.selectedItems || [];

    selectedItems.forEach((selectedItem) => {
      if (selectedItem.quantity > 0) {
        const itemData = availableItems.find(
          (item) => item.name === selectedItem.name
        );
        if (itemData) {
          const currentQty = itemsMap.get(itemData.name) || 0;
          itemsMap.set(itemData.name, currentQty + selectedItem.quantity);
        }
      }
    });
  });

  // Convert to array with proper formatting
  const allItems: string[] = [
    ...Array.from(stylesSet),
    ...Array.from(itemsMap.entries()).map(([name, quantity]) => {
      return quantity > 1 ? `${name} X${quantity}` : name;
    }),
  ];

  return {
    id: history.id,
    date: formatDate(history.orderDate),
    menuName: menuNames,
    style:
      history.orders.length > 1
        ? "복수 주문"
        : servingStyles[history.orders[0]?.style]?.name || "스타일",
    items: allItems,
    price: history.total,
    status: history.status,
    deliveryAddress: history.deliveryInfo.address,
    deliveryDate: formatDeliveryDate(history.deliveryInfo.date),
    deliveryTime: history.deliveryInfo.time,
  };
};

export default function PrevOrderPage() {
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // API에서 주문 내역 가져오기
        const orders = await orderApi.getMyOrders();

        // API 응답을 OrderHistory 형식으로 변환
        const convertedHistory: OrderHistory[] = orders.map((order) => {
          // orderItems를 로컬 OrderItem 형식으로 변환
          const localOrders = order.orderItems.map((item) => {
            // 해당 메뉴의 기본 아이템 정보 가져오기
            const availableItems = getItemsForMenu(item.menuId);

            // API의 selectedItems를 로컬 형식으로 변환
            // 모든 아이템을 포함하되, API에 있는 수량을 사용
            const selectedItems: SelectedItem[] = availableItems.map(
              (availableItem) => {
                const apiItem = item.selectedItems.find(
                  (si) => si.name === availableItem.name
                );
                return {
                  name: availableItem.name,
                  quantity: apiItem
                    ? apiItem.quantity
                    : availableItem.defaultQuantity || 1,
                };
              }
            );

            return {
              id: `order-${order.id}-${item.menuId}`,
              menuId: item.menuId,
              style: item.style as ServingStyleType,
              quantity: item.quantity,
              selectedItems,
            };
          });

          return {
            id: order.id.toString(),
            orderDate: order.metadata.orderDate,
            orders: localOrders,
            deliveryInfo: {
              address: order.deliveryInfo.address,
              date: order.deliveryInfo.date,
              time: order.deliveryInfo.time,
              cardNumber: order.deliveryInfo.cardNumber,
            },
            subtotal: order.pricing.subtotal,
            discount: order.pricing.discount,
            total: order.pricing.total,
            isRegularCustomer: order.customer.isRegularCustomer,
            status: order.status.toLowerCase() as
              | "completed"
              | "pending"
              | "cancelled",
          };
        });

        setOrderHistory(convertedHistory);

        // 로컬 스토리지에도 저장 (오프라인 대비)
        convertedHistory.forEach((history) => {
          addOrderHistory({
            orderDate: history.orderDate,
            orders: history.orders,
            deliveryInfo: history.deliveryInfo,
            subtotal: history.subtotal,
            discount: history.discount,
            total: history.total,
            isRegularCustomer: history.isRegularCustomer,
            status: history.status,
          });
        });
      } catch (error) {
        console.error("Failed to load order history:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "주문 내역을 불러오는데 실패했습니다.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, []);

  const hasOrders = orderHistory.length > 0;

  const handleReorder = (menuName: string, style: string) => {
    // 해당 주문 내역 찾기
    // 복수 주문의 경우 style이 "복수 주문"으로 표시되므로 다른 방식으로 찾기
    const orderToReorder = orderHistory.find((history) => {
      // 복수 주문인 경우
      if (style === "복수 주문" && history.orders.length > 1) {
        const historyMenuNames = history.orders
          .map((order) => {
            const menu = dinnerMenus.find((m) => m.id === order.menuId);
            return menu?.name || "";
          })
          .join(", ");
        return historyMenuNames === menuName;
      }

      // 단일 주문인 경우
      return history.orders.some((order) => {
        const menu = dinnerMenus.find((m) => m.id === order.menuId);
        const orderStyle = servingStyles[order.style];
        return menu?.name === menuName && orderStyle?.name === style;
      });
    });

    if (!orderToReorder) {
      alert("주문 정보를 찾을 수 없습니다.");
      return;
    }

    // 주문 정보를 orderStorage에 저장
    saveOrders(orderToReorder.orders);

    // change-option 페이지로 이동
    router.push("/change-option");
  };

  const handleViewDetails = (id: string | number) => {
    const order = orderHistory.find((history) => history.id === id);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Container>
        <Main>
          <ContentWrapper>
            <PageTitle>
              <Clock size={48} strokeWidth={2} />
              주문내역
            </PageTitle>
            <EmptyState>로딩 중...</EmptyState>
          </ContentWrapper>
        </Main>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Main>
          <ContentWrapper>
            <PageTitle>
              <Clock size={48} strokeWidth={2} />
              주문내역
            </PageTitle>
            <EmptyState>
              {error}
              <br />
              <br />
              로그인 후 다시 시도해주세요.
            </EmptyState>
          </ContentWrapper>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Clock size={48} strokeWidth={2} />
            주문내역
          </PageTitle>

          {hasOrders ? (
            <OrderList>
              {orderHistory.map((history) => {
                const order = convertToOrderCardFormat(history);
                return (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onViewDetails={handleViewDetails}
                    onReorder={handleReorder}
                  />
                );
              })}
            </OrderList>
          ) : (
            <EmptyState>
              주문 내역이 없습니다.
              <br />
              메뉴를 주문하면 이곳에 표시됩니다.
            </EmptyState>
          )}
        </ContentWrapper>
      </Main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </Container>
  );
}
