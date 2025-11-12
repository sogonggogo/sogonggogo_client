'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 544px;
  border-radius: 24px;
  box-shadow: 0 8px 10px -6px rgba(0, 0, 0, 0.1),
    0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(180deg, #6b4423 0%, #4a2c1a 100%);
`;

const InnerContainer = styled.div`
  padding: 32px;
`;

const Title = styled.h3`
  font-size: 24px;
  color: white;
  text-align: center;
  margin: 0;
`;

const Content = styled.div`
  margin-top: 32px;
`;

const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 14px;
  margin-top: 48px;
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
