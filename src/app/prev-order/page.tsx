"use client";

import styled from "@emotion/styled";
import Header from "@/components/main/Header";
import { formatPrice } from "@/data/menus";
import { Clock } from "lucide-react";

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

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const OrderStatus = styled.span<{
  status: "completed" | "pending" | "cancelled";
}>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ status, theme }) =>
    status === "completed"
      ? theme.colors.primary
      : status === "pending"
      ? theme.colors.secondary
      : theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
`;

const OrderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OrderDetails = styled.div`
  flex: 1;
`;

const MenuName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyleInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ItemTag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.buttonBackground};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const OrderPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
`;

const OrderFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterButton = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  background: ${({ variant, theme }) =>
    variant === "primary" ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ variant, theme }) =>
    variant === "primary" ? theme.colors.white : theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
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

export default function OrderHistoryPage() {
  const hasOrders = orderHistory.length > 0;

  const handleReorder = (menuName: string, style: string) => {
    alert(`재주문: ${menuName} (${style})`);
  };

  const handleViewDetails = (id: number) => {
    alert(`주문 상세 정보: ${id}`);
  };

  return (
    <Container>
      <Header />
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Clock size={48} strokeWidth={2} />
            주문내역
          </PageTitle>

          {hasOrders ? (
            <OrderList>
              {orderHistory.map((order) => (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <OrderDate>
                      <Clock size={20} />
                      <span>{order.date}</span>
                    </OrderDate>
                    <OrderStatus status={order.status}>
                      {order.status === "completed" ? "완료" : "진행중"}
                    </OrderStatus>
                  </OrderHeader>

                  <OrderContent>
                    <OrderDetails>
                      <MenuName>{order.menuName}</MenuName>
                      <StyleInfo>{order.style} 스타일</StyleInfo>
                      <ItemsList>
                        {order.items.map((item, index) => (
                          <ItemTag key={index}>{item}</ItemTag>
                        ))}
                      </ItemsList>
                    </OrderDetails>
                    <OrderPrice>{formatPrice(order.price)}</OrderPrice>
                  </OrderContent>

                  <OrderFooter>
                    <FooterButton onClick={() => handleViewDetails(order.id)}>
                      상세 보기
                    </FooterButton>
                    <FooterButton
                      variant="primary"
                      onClick={() => handleReorder(order.menuName, order.style)}
                    >
                      다시 주문
                    </FooterButton>
                  </OrderFooter>
                </OrderCard>
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

