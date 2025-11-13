"use client";

import styled from "@emotion/styled";
import { formatPrice } from "@/data/menus";

const ButtonContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const PriceLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
`;

const PriceValue = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
`;

const OrderButton = styled.button`
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

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

interface FinalOrderButtonProps {
  totalPrice: number;
  onOrder: () => void;
}

export default function FinalOrderButton({
  totalPrice,
  onOrder,
}: FinalOrderButtonProps) {
  return (
    <ButtonContainer>
      <PriceSummary>
        <PriceLabel>총 결제 금액</PriceLabel>
        <PriceValue>{formatPrice(totalPrice)}</PriceValue>
      </PriceSummary>
      <OrderButton onClick={onOrder}>주문하기</OrderButton>
    </ButtonContainer>
  );
}

