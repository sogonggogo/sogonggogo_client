"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import type {
  MenuItem,
  MenuItemOption,
  SelectedItem,
} from "@/types/domain/menu";
import type { ServingStyle } from "@/types/domain/style";
import { Minus, Plus, Trash2 } from "lucide-react";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradientOrange};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MenuInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MenuTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyleBadge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const PriceDisplay = styled.div`
  text-align: right;
`;

const TotalPrice = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.accent};
`;

const OptionsText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  margin-top: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ChangeOptionButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackground};
  }
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
  min-width: 24px;
  text-align: center;
`;

interface OrderCardProps {
  menu: MenuItem;
  style: ServingStyle;
  basePrice: number;
  quantity: number;
  selectedItems: SelectedItem[];
  availableItems: MenuItemOption[];
  totalPrice: number;
  onChangeOption: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

export default function OrderCard({
  menu,
  style,
  quantity,
  selectedItems,
  availableItems,
  totalPrice,
  onChangeOption,
  onIncrease,
  onDecrease,
  onDelete,
}: OrderCardProps) {
  const modifiedItems = selectedItems.filter((item) => {
    const itemData = availableItems.find((i) => i.name === item.name);
    const defaultQty = itemData?.defaultQuantity || 1;
    return item.quantity !== defaultQty;
  });

  const itemsText =
    modifiedItems.length > 0
      ? modifiedItems
          .map((item) => {
            const itemData = availableItems.find((i) => i.name === item.name);
            const defaultQty = itemData?.defaultQuantity || 1;
            if (item.quantity === 0) {
              return `${item.name} 제거`;
            } else if (item.quantity > defaultQty) {
              return `${item.name} +${item.quantity - defaultQty}`;
            } else {
              return `${item.name} ${item.quantity}/${defaultQty}`;
            }
          })
          .join(", ")
      : "기본 구성";

  return (
    <Card>
      <ImageWrapper>
        {menu.image && (
          <Image
            src={menu.image}
            alt={menu.name}
            fill
            sizes="120px"
            style={{ objectFit: "cover" }}
          />
        )}
      </ImageWrapper>

      <ContentSection>
        <TopRow>
          <MenuInfo>
            <MenuTitle>{menu.name}</MenuTitle>
            <StyleBadge>{style.name}</StyleBadge>
          </MenuInfo>
          <PriceDisplay>
            <TotalPrice>{formatPrice(totalPrice)}</TotalPrice>
            <ChangeOptionButton onClick={onChangeOption}>
              옵션 변경
            </ChangeOptionButton>
          </PriceDisplay>
        </TopRow>

        <BottomRow>
          <QuantityControls>
            <DeleteButton onClick={onDelete}>
              <Trash2 size={16} strokeWidth={2} />
            </DeleteButton>
            <ControlButton onClick={onDecrease} disabled={quantity <= 1}>
              <Minus size={16} strokeWidth={2} />
            </ControlButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <ControlButton onClick={onIncrease}>
              <Plus size={16} strokeWidth={2} />
            </ControlButton>
          </QuantityControls>
        </BottomRow>
      </ContentSection>
    </Card>
  );
}
