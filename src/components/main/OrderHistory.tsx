"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { dinnerMenus, formatPrice } from "@/data/menus";
import { servingStyles } from "@/data/styles";
import {
  getOrderHistory,
  OrderHistory as OrderHistoryType,
} from "@/utils/orderHistoryStorage";

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
  const [orderHistory, setOrderHistory] = useState<OrderHistoryType[]>([]);

  useEffect(() => {
    const history = getOrderHistory();
    setOrderHistory(history);
  }, []);

  const hasOrders = orderHistory.length > 0;

  return (
    <Container>
      <InnerContainer>
        <Title>이전 주문 목록</Title>

        <Content>
          {hasOrders ? (
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
                  <ReorderButton
                    onClick={() =>
                      alert(
                        `재주문 기능은 추후 제공 예정입니다. (주문: ${getOrderSummary(
                          order
                        )})`
                      )
                    }
                  >
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
