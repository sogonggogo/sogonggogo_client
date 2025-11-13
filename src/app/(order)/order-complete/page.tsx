"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { getOrderHistory } from "@/utils/orderHistoryStorage";
import OrderCompleteSummary from "@/components/order/order-complete/OrderCompleteSummary";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.headerHeight};
  padding-left: ${({ theme }) => theme.spacing.container};
  padding-right: ${({ theme }) => theme.spacing.container};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const SuccessHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const SuccessIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.xl};

  svg {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SuccessTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SuccessMessage = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
`;

const HomeButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  margin-top: ${({ theme }) => theme.spacing.xl};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
`;

export default function OrderCompletePage() {
  const router = useRouter();
  const [latestOrder, setLatestOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the latest order from history
    const history = getOrderHistory();
    if (history.length > 0) {
      setLatestOrder(history[0]); // Most recent order
    }
    setLoading(false);
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <Container>
        <Main>
          <ErrorMessage>로딩 중...</ErrorMessage>
        </Main>
      </Container>
    );
  }

  if (!latestOrder) {
    return (
      <Container>
        <Main>
          <ContentWrapper>
            <ErrorMessage>주문 정보를 찾을 수 없습니다.</ErrorMessage>
            <HomeButton onClick={handleGoHome}>메인 화면</HomeButton>
          </ContentWrapper>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <SuccessHeader>
            <SuccessIcon>
              <CheckCircle size={64} strokeWidth={3} />
            </SuccessIcon>
            <SuccessTitle>주문이 완료되었습니다!</SuccessTitle>
            <SuccessMessage>
              맛있는 식사를 준비하여 배달하겠습니다.
            </SuccessMessage>
          </SuccessHeader>

          <OrderCompleteSummary order={latestOrder} />

          <HomeButton onClick={handleGoHome}>메인 화면</HomeButton>
        </ContentWrapper>
      </Main>
    </Container>
  );
}

