"use client";

import styled from "@emotion/styled";
import { formatPrice } from "@/utils/format";
import type { MenuItemOption, SelectedItem } from "@/types/domain/menu";
import { Minus, Plus, Trash2 } from "lucide-react";

const MenuSection = styled.div``;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transition.fast};
`;

const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const OptionName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
`;

const OptionPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentAlpha70};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ControlButton = styled.button`
  width: 32px;
  height: 32px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(ControlButton)`
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const QuantityDisplay = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  min-width: 30px;
  text-align: center;
`;

interface MenuItemOptionsProps {
  items: MenuItemOption[];
  selectedItems: SelectedItem[];
  onIncreaseItem: (itemName: string) => void;
  onDecreaseItem: (itemName: string) => void;
  onRemoveItem: (itemName: string) => void;
}

export default function MenuItemOptions({
  items,
  selectedItems,
  onIncreaseItem,
  onDecreaseItem,
  onRemoveItem,
}: MenuItemOptionsProps) {
  const getItemQuantity = (itemName: string): number => {
    const selectedItem = selectedItems.find((si) => si.name === itemName);
    if (selectedItem) return selectedItem.quantity;

    const itemData = items.find((i) => i.name === itemName);
    return itemData?.defaultQuantity || 1;
  };

  return (
    <MenuSection>
      <SectionTitle>세부 메뉴</SectionTitle>
      <OptionsList>
        {items.map((item) => {
          const quantity = getItemQuantity(item.name);

          return (
            <OptionItem key={item.name}>
              <OptionInfo>
                <OptionName>{item.name}</OptionName>
                <OptionPrice>{formatPrice(item.basePrice)}</OptionPrice>
              </OptionInfo>
              <QuantityControls>
                <DeleteButton onClick={() => onRemoveItem(item.name)}>
                  <Trash2 size={16} strokeWidth={2} />
                </DeleteButton>
                <ControlButton onClick={() => onDecreaseItem(item.name)}>
                  <Minus size={16} strokeWidth={2} />
                </ControlButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <ControlButton onClick={() => onIncreaseItem(item.name)}>
                  <Plus size={16} strokeWidth={2} />
                </ControlButton>
              </QuantityControls>
            </OptionItem>
          );
        })}
      </OptionsList>
    </MenuSection>
  );
}
