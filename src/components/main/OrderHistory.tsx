"use client";

import styled from "@emotion/styled";
import { Clock } from "lucide-react";
import { formatPrice } from "@/data/menus";

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

// 샘플 데이터
const orderHistory = [
  {
    id: 1,
    date: "2025.11.12",
    items: "발렌타인 디너 (디럭스)",
    price: formatPrice(Math.round(89000 * 1.6)),
    status: "completed" as const,
  },
  {
    id: 2,
    date: "2025.11.10",
    items: "프렌치 디너 (그랜드)",
    price: formatPrice(Math.round(65000 * 1.3)),
    status: "completed" as const,
  },
  {
    id: 3,
    date: "2025.11.08",
    items: "잉글리시 디너 (심플)",
    price: formatPrice(55000),
    status: "completed" as const,
  },
  {
    id: 4,
    date: "2025.11.05",
    items: "샴페인 축제 디너 (디럭스)",
    price: formatPrice(Math.round(120000 * 1.6)),
    status: "completed" as const,
  },
  {
    id: 5,
    date: "2025.11.03",
    items: "프렌치 디너 (심플)",
    price: formatPrice(65000),
    status: "completed" as const,
  },
  {
    id: 6,
    date: "2025.11.01",
    items: "발렌타인 디너 (그랜드)",
    price: formatPrice(Math.round(89000 * 1.3)),
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
                <OrderFooter>
                  <OrderPrice>{order.price}</OrderPrice>
                  <ReorderButton
                    onClick={() => console.log(`재주문: ${order.items}`)}
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
