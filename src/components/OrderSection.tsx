'use client';

import styled from '@emotion/styled';
import { ShoppingCart, Mic, Clock } from 'lucide-react';

const Section = styled.section`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: #d62300;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const CardButton = styled.button`
  position: relative;
  height: 225px;
  border-radius: 26px;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    background-color: #c9c9c9;
  }
`;

const CardContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
`;

const IconWrapper = styled.div`
  transition: transform 0.3s;

  ${CardButton}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: #d62300;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: rgba(92, 51, 23, 0.7);
  text-align: center;
  margin: 0;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;

  ${CardButton}:hover & {
    opacity: 1;
  }
`;

const orderCards = [
  {
    id: 1,
    title: '일반주문',
    icon: ShoppingCart,
    description: '메뉴를 선택하여 주문하세요',
    link: '/order'
  },
  {
    id: 2,
    title: '음성주문',
    icon: Mic,
    description: '음성으로 간편하게 주문하세요',
    link: '/voice-order'
  },
  {
    id: 3,
    title: '주문내역',
    icon: Clock,
    description: '이전 주문을 확인하세요',
    link: '/order-history'
  }
];

export default function OrderSection() {
  return (
    <Section>
      <Header>
        <Title>ORDER</Title>
      </Header>

      <Grid>
        {orderCards.map((card) => {
          const Icon = card.icon;
          return (
            <CardButton key={card.id}>
              {/* Card Content */}
              <CardContent>
                <IconWrapper>
                  <Icon size={48} color="#5C3317" strokeWidth={1.5} />
                </IconWrapper>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>

              {/* Hover Effect */}
              <HoverOverlay />
            </CardButton>
          );
        })}
      </Grid>
    </Section>
  );
}
