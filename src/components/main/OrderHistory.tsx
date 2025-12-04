"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { dinnerMenus, formatPrice } from "@/data/menus";
import { servingStyles, ServingStyleType } from "@/data/styles";
import { OrderHistory as OrderHistoryType } from "@/utils/orderHistoryStorage";
import { orderApi } from "@/services/orderApi";
import { SelectedItem, getItemsForMenu } from "@/data/additionalOptions";
import { saveOrders } from "@/utils/orderStorage";

const Container = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.sizes.orderHistoryHeight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradientBrown};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const InnerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin: 0;
  flex-shrink: 0;
`;

const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.colors.whiteAlpha60};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

type OrderStatusType =
  | "PENDING"
  | "APPROVED"
  | "COOKING"
  | "READY_FOR_DELIVERY"
  | "IN_DELIVERY"
  | "COMPLETED"
  | "REJECTED";

const OrderStatus = styled.span<{
  status: OrderStatusType;
}>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background: ${({ status, theme }) => {
    switch (status) {
      case "COMPLETED":
        return theme.colors.primary; // 완료 - 주황색
      case "PENDING":
        return "#FFA500"; // 승인 대기중 - 오렌지
      case "APPROVED":
        return "#4169E1"; // 조리 대기중 - 로얄블루
      case "COOKING":
        return "#FF6347"; // 조리중 - 토마토
      case "READY_FOR_DELIVERY":
        return "#32CD32"; // 배달 대기중 - 라임그린
      case "IN_DELIVERY":
        return "#1E90FF"; // 배달중 - 다저블루
      case "REJECTED":
        return theme.colors.accent; // 주문 거절 - 갈색
      default:
        return theme.colors.secondary;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
`;

const OrderItems = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const OrderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const OrderPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ReorderButton = styled.button`
  background: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fontFamily.miwon};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const getOrderSummary = (history: OrderHistoryType): string => {
  const entries = history.orders.map((order) => {
    const menu = dinnerMenus.find((m) => m.id === order.menuId);
    const style = servingStyles[order.style];
    if (!menu) return "알 수 없는 메뉴";
    return style ? `${menu.name} (${style.name})` : menu.name;
  });

  if (entries.length === 0) {
    return "주문 내역";
  }

  const summary = entries[0];
  if (entries.length > 1) {
    return `${summary} 외 ${entries.length - 1}건`;
  }
  return summary;
};

const getStatusLabel = (status: string): string => {
  const upperStatus = status.toUpperCase();
  switch (upperStatus) {
    case "PENDING":
      return "승인 대기중";
    case "APPROVED":
      return "조리 대기중";
    case "COOKING":
      return "조리중";
    case "READY_FOR_DELIVERY":
      return "배달 대기중";
    case "IN_DELIVERY":
      return "배달중";
    case "COMPLETED":
      return "완료";
    case "REJECTED":
      return "주문 거절";
    default:
      return "알 수 없음";
  }
};

export default function OrderHistory() {
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState<OrderHistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        setNeedsLogin(false);

        // API에서 주문 내역 가져오기
        const orders = await orderApi.getMyOrders();

        // API 응답을 OrderHistory 형식으로 변환
        const convertedHistory: OrderHistoryType[] = orders.map((order) => {
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
            status: order.status.toUpperCase() as OrderStatusType,
          };
        });

        // 최신순으로 정렬하고 최대 5개만 표시
        const sortedHistory = convertedHistory
          .sort(
            (a, b) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          )
          .slice(0, 5);

        setOrderHistory(sortedHistory);
      } catch (error) {
        console.error("Failed to load order history:", error);
        // 401 에러 (로그인 필요) 확인
        if (error instanceof Error && error.message.includes("로그인")) {
          setNeedsLogin(true);
        }
        setOrderHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, []);

  const handleReorder = (order: OrderHistoryType) => {
    // 주문 정보를 orderStorage에 저장
    saveOrders(order.orders);
    // change-option 페이지로 이동
    router.push("/change-option");
  };

  const hasOrders = orderHistory.length > 0;

  return (
    <Container>
      <InnerContainer>
        <Title>이전 주문 목록</Title>

        <Content>
          {loading ? (
            <EmptyState>로딩 중...</EmptyState>
          ) : needsLogin ? (
            <EmptyState>
              로그인이 필요합니다
              <br />
              <small
                style={{
                  fontSize: "0.9em",
                  marginTop: "8px",
                  display: "block",
                }}
              >
                주문 내역을 확인하려면 로그인해주세요
              </small>
            </EmptyState>
          ) : hasOrders ? (
            orderHistory.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <OrderDate>
                    <Clock size={12} />
                    <span>{formatDate(order.orderDate)}</span>
                  </OrderDate>
                  <OrderStatus status={order.status as OrderStatusType}>
                    {getStatusLabel(order.status)}
                  </OrderStatus>
                </OrderHeader>
                <OrderItems>{getOrderSummary(order)}</OrderItems>
                <OrderFooter>
                  <OrderPrice>{formatPrice(order.total)}</OrderPrice>
                  <ReorderButton onClick={() => handleReorder(order)}>
                    바로 주문하기
                  </ReorderButton>
                </OrderFooter>
              </OrderCard>
            ))
          ) : (
            <EmptyState>최근 주문 내역이 없습니다</EmptyState>
          )}
        </Content>
      </InnerContainer>
    </Container>
  );
}
