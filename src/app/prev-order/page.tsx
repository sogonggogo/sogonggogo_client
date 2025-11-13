"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import OrderCard from "@/components/prev-order/OrderCard";
import { getOrderHistory, OrderHistory } from "@/utils/orderHistoryStorage";
import { dinnerMenus } from "@/data/menus";
import { servingStyles } from "@/data/styles";
import { getItemsForMenu } from "@/data/additionalOptions";

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
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load order history from localStorage
    const history = getOrderHistory();
    setOrderHistory(history);
    setLoading(false);
  }, []);

  const hasOrders = orderHistory.length > 0;

  const handleReorder = (menuName: string, style: string) => {
    alert(
      `재주문: ${menuName} (${style})\n재주문 기능은 추후 구현될 예정입니다.`
    );
  };

  const handleViewDetails = (id: string | number) => {
    alert(`주문 상세 정보: ${id}\n상세 보기 기능은 추후 구현될 예정입니다.`);
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
    </Container>
  );
}
