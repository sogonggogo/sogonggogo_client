"use client";

import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.sizes.orderHistoryHeight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradientBrown};
`;

const InnerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin: 0;
`;

const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.colors.whiteAlpha60};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

export default function OrderHistory() {
  return (
    <Container>
      <InnerContainer>
        <Title>이전 주문 목록</Title>

        <Content>
          {/* Empty state or order items would go here */}
          <EmptyState>최근 주문 내역이 없습니다</EmptyState>
        </Content>
      </InnerContainer>
    </Container>
  );
}
