"use client";

import styled from "@emotion/styled";
import { Clock } from "lucide-react";

const Container = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.sizes.orderHistoryHeight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradientBrown};
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
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
  margin-top: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.blackAlpha10};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.whiteAlpha50};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.whiteAlpha60};
    }
  }
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.colors.whiteAlpha60};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.whiteAlpha10};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.whiteAlpha15};
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.whiteAlpha80};
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
      ? theme.colors.whiteAlpha25
      : status === "pending"
      ? theme.colors.secondary
      : theme.colors.blackAlpha25};
  color: ${({ theme }) => theme.colors.white};
`;

const OrderItems = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const OrderPrice = styled.div`
  color: ${({ theme }) => theme.colors.whiteAlpha80};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: right;
`;

// 샘플 데이터
const orderHistory = [
  {
    id: 1,
    date: "2025.11.12",
    items: "와퍼 세트, 치즈스틱 4조각",
    price: "12,800원",
    status: "completed" as const,
  },
  {
    id: 2,
    date: "2025.11.10",
    items: "맥시멈 버거 세트",
    price: "9,500원",
    status: "completed" as const,
  },
  {
    id: 3,
    date: "2025.11.08",
    items: "치킨버거, 콜라 (L)",
    price: "7,300원",
    status: "completed" as const,
  },
  {
    id: 4,
    date: "2025.11.05",
    items: "와퍼 주니어, 프렌치프라이",
    price: "8,900원",
    status: "completed" as const,
  },
  {
    id: 5,
    date: "2025.11.03",
    items: "맥시멈 버거 2개, 콜라 2개",
    price: "18,600원",
    status: "completed" as const,
  },
  {
    id: 6,
    date: "2025.11.01",
    items: "치즈버거 세트",
    price: "6,500원",
    status: "completed" as const,
  },
];

export default function OrderHistory() {
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
                    <span>{order.date}</span>
                  </OrderDate>
                  <OrderStatus status={order.status}>완료</OrderStatus>
                </OrderHeader>
                <OrderItems>{order.items}</OrderItems>
                <OrderPrice>{order.price}</OrderPrice>
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
