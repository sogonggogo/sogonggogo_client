"use client";

import styled from "@emotion/styled";
import { Clock } from "lucide-react";
import OrderCard from "@/components/prev-order/OrderCard";

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
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

// 샘플 데이터
const orderHistory = [
  {
    id: 1,
    date: "2025.11.12",
    menuName: "발렌타인 디너",
    style: "디럭스",
    items: ["와인", "스테이크", "하트 장식", "큐피드 장식"],
    price: Math.round(89000 * 1.6),
    status: "completed" as const,
  },
  {
    id: 2,
    date: "2025.11.10",
    menuName: "프렌치 디너",
    style: "그랜드",
    items: ["커피", "와인", "샐러드", "스테이크"],
    price: Math.round(65000 * 1.3),
    status: "completed" as const,
  },
  {
    id: 3,
    date: "2025.11.08",
    menuName: "잉글리시 디너",
    style: "심플",
    items: ["에그 스크램블", "베이컨", "빵", "스테이크"],
    price: 55000,
    status: "completed" as const,
  },
  {
    id: 4,
    date: "2025.11.05",
    menuName: "샴페인 축제 디너",
    style: "디럭스",
    items: ["샴페인 1병", "바게트 빵 4개", "커피 1포트", "와인", "스테이크"],
    price: Math.round(120000 * 1.6),
    status: "completed" as const,
  },
];

export default function PrevOrderPage() {
  const hasOrders = orderHistory.length > 0;

  const handleReorder = (menuName: string, style: string) => {
    alert(`재주문: ${menuName} (${style})`);
  };

  const handleViewDetails = (id: number) => {
    alert(`주문 상세 정보: ${id}`);
  };

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
              {orderHistory.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                  onReorder={handleReorder}
                />
              ))}
            </OrderList>
          ) : (
            <EmptyState>주문 내역이 없습니다</EmptyState>
          )}
        </ContentWrapper>
      </Main>
    </Container>
  );
}
