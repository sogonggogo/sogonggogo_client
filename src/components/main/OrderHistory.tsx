"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { dinnerMenus, formatPrice } from "@/data/menus";
import { servingStyles, ServingStyleType } from "@/data/styles";
import { OrderHistory as OrderHistoryType } from "@/utils/orderHistoryStorage";
import { orderApi, OrderResponse } from "@/services/orderApi";
import { SelectedItem } from "@/data/additionalOptions";
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

const OrderStatus = styled.span<{
  status: "completed" | "pending" | "cancelled";
}>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background: ${({ status, theme }) =>
    status === "completed"
      ? theme.colors.primary
      : status === "pending"
      ? theme.colors.secondary
      : theme.colors.accent};
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

export default function OrderHistory() {
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState<OrderHistoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);

        // API에서 주문 내역 가져오기
        const orders = await orderApi.getMyOrders();

        // API 응답을 OrderHistory 형식으로 변환
        const convertedHistory: OrderHistoryType[] = orders.map((order) => {
          // orderItems를 로컬 OrderItem 형식으로 변환
          const localOrders = order.orderItems.map((item) => ({
            id: `order-${order.id}-${item.menuId}`,
            menuId: item.menuId,
            style: item.style as ServingStyleType,
            quantity: item.quantity,
            selectedItems: item.selectedItems.map((si) => ({
              name: si.name,
              quantity: si.quantity,
            })) as SelectedItem[],
          }));

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
        // 에러 발생 시 빈 배열 표시 (로그인 안 한 경우 등)
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
          ) : hasOrders ? (
            orderHistory.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <OrderDate>
                    <Clock size={12} />
                    <span>{formatDate(order.orderDate)}</span>
                  </OrderDate>
                  <OrderStatus status={order.status}>
                    {order.status === "completed"
                      ? "완료"
                      : order.status === "pending"
                      ? "진행중"
                      : "취소"}
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
