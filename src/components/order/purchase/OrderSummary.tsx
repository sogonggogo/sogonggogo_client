"use client";

import styled from "@emotion/styled";
import { OrderItem } from "@/storage/order";
import { dinnerMenus } from "@/constants/menus";
import { formatPrice } from "@/utils/format";
import { servingStyles } from "@/constants/styles";
import { calculatePriceWithStyle } from "@/utils/calculations";
import { getItemsForMenu } from "@/utils/menu";

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const OrderItemCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MenuName = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StyleInfo = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const QuantityBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const ItemsList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent};
`;

const PriceInfo = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

interface OrderSummaryProps {
  orders: OrderItem[];
}

export default function OrderSummary({ orders }: OrderSummaryProps) {
  return (
    <OrderList>
      {orders.map((order) => {
        const menu = dinnerMenus.find((m) => m.id === order.menuId);
        const style = servingStyles[order.style];

        if (!menu || !style) return null;

        const basePrice = calculatePriceWithStyle(menu.basePrice, order.style);
        const availableItems = getItemsForMenu(order.menuId);

        const selectedItems =
          order.selectedItems ||
          availableItems.map((item) => ({
            name: item.name,
            quantity: item.defaultQuantity || 1,
          }));

        const itemsPrice = availableItems.reduce((total, itemData) => {
          const selectedItem = selectedItems.find(
            (si) => si.name === itemData.name
          );
          const quantity = selectedItem
            ? selectedItem.quantity
            : itemData.defaultQuantity || 1;
          const defaultQty = itemData.defaultQuantity || 1;
          return total + itemData.basePrice * (quantity - defaultQty);
        }, 0);

        const totalPrice = (basePrice + itemsPrice) * order.quantity;

        return (
          <OrderItemCard key={order.id}>
            <OrderHeader>
              <div>
                <MenuName>{menu.name}</MenuName>
                <StyleInfo>
                  {style.name} · {formatPrice(basePrice)}
                </StyleInfo>
              </div>
              <PriceInfo>
                <QuantityBadge>× {order.quantity}</QuantityBadge>
                <Price>{formatPrice(totalPrice)}</Price>
              </PriceInfo>
            </OrderHeader>

            <ItemsList>
              {availableItems.map((itemData) => {
                const selectedItem = selectedItems.find(
                  (si) => si.name === itemData.name
                );
                const quantity = selectedItem
                  ? selectedItem.quantity
                  : itemData.defaultQuantity || 1;

                if (quantity === 0) return null;

                return (
                  <ItemRow key={itemData.name}>
                    <span>
                      {itemData.name} × {quantity}
                    </span>
                  </ItemRow>
                );
              })}
            </ItemsList>
          </OrderItemCard>
        );
      })}
    </OrderList>
  );
}

