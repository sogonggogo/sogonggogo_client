"use client";

import styled from "@emotion/styled";

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AddMenuButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackground};
  }
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

interface ActionButtonsProps {
  totalPrice: string;
  onAddMenu: () => void;
  onOrder: () => void;
}

export default function ActionButtons({
  totalPrice,
  onAddMenu,
  onOrder,
}: ActionButtonsProps) {
  return (
    <ButtonGroup>
      <AddMenuButton onClick={onAddMenu}>+ 메뉴 추가</AddMenuButton>
      <OrderButton onClick={onOrder}>{totalPrice} 주문하기</OrderButton>
    </ButtonGroup>
  );
}

