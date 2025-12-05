"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { ShoppingCart, Mic, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { isLoggedIn } from "@/storage/user";

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

const CardLink = styled(Link)<{ disabled?: boolean }>`
  text-decoration: none;
  display: block;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const CardButton = styled.div<{ disabled?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.sizes.orderCardHeight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.colors.buttonBackground : theme.colors.border};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-4px)")};
    box-shadow: ${({ disabled, theme }) =>
      disabled ? "none" : theme.shadow.md};
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

const CardDescription = styled.p<{ disabled?: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.accentAlpha70 : theme.colors.accentAlpha70};
  text-align: center;
  margin: 0;
`;

const LoginRequiredText = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <Section>
      <Header>
        <Title>ORDER</Title>
      </Header>

      {orderCards.map((card) => {
        const Icon = card.icon;
        const disabled = !loggedIn;
        return (
          <CardLink href={card.link} key={card.id} disabled={disabled}>
            <CardButton disabled={disabled}>
              <CardContent>
                <IconWrapper>
                  <Icon size={48} color="#5C3317" strokeWidth={1.5} />
                </IconWrapper>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription disabled={disabled}>
                  {card.description}
                </CardDescription>
                {disabled && <LoginRequiredText>로그인이 필요합니다</LoginRequiredText>}
              </CardContent>
              <HoverOverlay />
            </CardButton>
          </CardLink>
        );
      })}
    </Section>
  );
}
