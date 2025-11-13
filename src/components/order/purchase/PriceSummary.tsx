"use client";

import styled from "@emotion/styled";
import { formatPrice } from "@/data/menus";

const SummaryContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const PriceRow = styled.div<{ isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  font-family: ${({ theme }) => theme.fontFamily.miwon};

  ${({ isTotal, theme }) =>
    isTotal
      ? `
    font-size: ${theme.fontSize.xxl};
    font-weight: ${theme.fontWeight.black};
    color: ${theme.colors.primary};
    margin-top: ${theme.spacing.md};
    padding-top: ${theme.spacing.lg};
    border-top: 2px solid ${theme.colors.border};
  `
      : `
    font-size: ${theme.fontSize.lg};
    color: ${theme.colors.accent};
  `}
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Value = styled.span<{ isDiscount?: boolean }>`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  ${({ isDiscount, theme }) =>
    isDiscount &&
    `
    color: ${theme.colors.secondary};
  `}
`;

interface PriceSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  isRegular: boolean;
}

export default function PriceSummary({
  subtotal,
  discount,
  total,
  isRegular,
}: PriceSummaryProps) {
  return (
    <SummaryContainer>
      <PriceRow>
        <Label>주문 금액</Label>
        <Value>{formatPrice(subtotal)}</Value>
      </PriceRow>

      {isRegular && discount > 0 && (
        <PriceRow>
          <Label>단골 고객 할인 (10%)</Label>
          <Value isDiscount>- {formatPrice(discount)}</Value>
        </PriceRow>
      )}

      <PriceRow isTotal>
        <Label>최종 결제 금액</Label>
        <Value>{formatPrice(total)}</Value>
      </PriceRow>
    </SummaryContainer>
  );
}

