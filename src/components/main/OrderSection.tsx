"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { ShoppingCart, Mic, Clock } from "lucide-react";

const Section = styled.section`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
`;

const Header = styled.div`
  grid-column: 1 / -1;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.bagelfat};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const CardButton = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.sizes.orderCardHeight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  cursor: pointer;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
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
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CardDescription = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
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
    link: "/select-dish",
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
    link: "/prev-order",
  },
];

export default function OrderSection() {
  return (
    <Section>
      <Header>
        <Title>ORDER</Title>
      </Header>

      {orderCards.map((card) => {
        const Icon = card.icon;
        return (
          <CardLink href={card.link} key={card.id}>
            <CardButton>
              <CardContent>
                <IconWrapper>
                  <Icon size={48} color="#5C3317" strokeWidth={1.5} />
                </IconWrapper>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
              <HoverOverlay />
            </CardButton>
          </CardLink>
        );
      })}
    </Section>
  );
}
