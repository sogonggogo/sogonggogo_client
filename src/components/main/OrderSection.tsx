"use client";

import styled from "@emotion/styled";
import { ShoppingCart, Mic, Clock } from "lucide-react";

const Section = styled.section`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.bagelfat};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CardButton = styled.button`
  position: relative;
  height: ${({ theme }) => theme.sizes.orderCardHeight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transition.normal};

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
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const IconWrapper = styled.div`
  transition: transform ${({ theme }) => theme.transition.normal};

  ${CardButton}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  text-align: center;
  margin: 0;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.blackAlpha10},
    transparent
  );
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transition.normal};

  ${CardButton}:hover & {
    opacity: 1;
  }
`;

const orderCards = [
  {
    id: 1,
    title: "일반주문",
    icon: ShoppingCart,
    description: "메뉴를 선택하여 주문하세요",
    link: "/order",
  },
  {
    id: 2,
    title: "음성주문",
    icon: Mic,
    description: "음성으로 간편하게 주문하세요",
    link: "/voice-order",
  },
  {
    id: 3,
    title: "주문내역",
    icon: Clock,
    description: "이전 주문을 확인하세요",
    link: "/order-history",
  },
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
