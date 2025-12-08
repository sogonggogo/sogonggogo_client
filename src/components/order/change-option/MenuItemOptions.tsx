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
  items: MenuItemOption[]; // 기본 메뉴의 세부 항목
  allItems?: MenuItemOption[]; // 모든 디너의 모든 세부 항목 (선택사항)
  selectedItems: SelectedItem[];
  onIncreaseItem: (itemName: string) => void;
  onDecreaseItem: (itemName: string) => void;
  onRemoveItem: (itemName: string) => void;
}

export default function MenuItemOptions({
  items,
  allItems,
  selectedItems,
  onIncreaseItem,
  onDecreaseItem,
  onRemoveItem,
}: MenuItemOptionsProps) {
  // 기본 메뉴의 아이템 이름 Set 생성 (중복 체크용)
  const defaultItemNames = new Set(items.map((item) => item.name));

  const getItemQuantity = (itemName: string): number => {
    const selectedItem = selectedItems.find((si) => si.name === itemName);
    
    // selectedItems에 있으면 그 수량 사용
    if (selectedItem) return selectedItem.quantity;

    // 기본 메뉴의 아이템인 경우에만 defaultQuantity 사용
    const isDefaultItem = defaultItemNames.has(itemName);
    if (isDefaultItem) {
      const itemData = items.find((i) => i.name === itemName);
      return itemData?.defaultQuantity || 1;
    }

    // 추가 항목은 기본값 0
    return 0;
  };

  const getItemPrice = (itemName: string): number => {
    const itemData = items.find((i) => i.name === itemName);
    if (itemData) return itemData.basePrice;

    if (allItems) {
      const allItemData = allItems.find((i) => i.name === itemName);
      if (allItemData) return allItemData.basePrice;
    }

    return 10000; // 기본 가격
  };

  // 표시할 아이템 목록: 기본 메뉴 아이템 + 추가 아이템 (중복 제거)
  const displayItems: MenuItemOption[] = [
    ...items, // 기본 메뉴의 아이템 먼저
    ...(allItems || []).filter((item) => !defaultItemNames.has(item.name)), // 추가 아이템 (중복 제거)
  ];

  return (
    <MenuSection>
      <SectionTitle>세부 메뉴</SectionTitle>
      <OptionsList>
        {displayItems.map((item) => {
          const quantity = getItemQuantity(item.name);
          const price = getItemPrice(item.name);
          const isDefaultItem = defaultItemNames.has(item.name);

          return (
            <OptionItem key={item.name}>
              <OptionInfo>
                <OptionName>
                  {item.name}
                  {!isDefaultItem && (
                    <span
                      style={{
                        fontSize: "0.75em",
                        color: "#888",
                        marginLeft: "8px",
                      }}
                    >
                      (추가)
                    </span>
                  )}
                </OptionName>
                <OptionPrice>{formatPrice(price)}</OptionPrice>
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
