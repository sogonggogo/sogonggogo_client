"use client";

import styled from "@emotion/styled";
import { OrderItem } from "@/storage/order";
import { dinnerMenus } from "@/constants/menus";
import { formatPrice } from "@/utils/format";
import { servingStyles } from "@/constants/styles";
import { getItemsForMenu, getAllMenuItems } from "@/utils/menu";
import { calculateOrderItemPrice } from "@/utils/orderPrice";

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
        // voice-order에서 추가된 메뉴인지 확인 (menuName이 있고 menuId < 0)
        const isVoiceOrderAdditionalMenu = order.menuName && order.menuId < 0;

        // 기존 메뉴 찾기 (일반 주문 또는 voice-order의 기존 메뉴)
        const menu =
          order.menuId > 0 && order.menuId <= 4
            ? dinnerMenus.find((m) => m.id === order.menuId)
            : null;
        const menuName =
          order.menuName || (menu ? menu.name : "알 수 없는 메뉴");
        const style = servingStyles[order.style];

        if (!style) return null;

        // voice-order에서 추가된 메뉴인 경우만 특별 처리
        if (isVoiceOrderAdditionalMenu) {
          const selectedItems = order.selectedItems || [];

          // order.subtotal이 있으면 사용, 없으면 계산
          const totalPrice = order.subtotal ?? calculateOrderItemPrice(order);

          return (
            <OrderItemCard key={order.id}>
              <OrderHeader>
                <div>
                  <MenuName>{menuName}</MenuName>
                  <StyleInfo>{style.name}</StyleInfo>
                </div>
                <PriceInfo>
                  <QuantityBadge>× {order.quantity}</QuantityBadge>
                  <Price>{formatPrice(totalPrice)}</Price>
                </PriceInfo>
              </OrderHeader>

              <ItemsList>
                {selectedItems.length > 0 ? (
                  selectedItems
                    .filter((item) => item.quantity > 0)
                    .map((item) => (
                      <ItemRow key={item.name}>
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                      </ItemRow>
                    ))
                ) : (
                  <ItemRow>
                    <span style={{ color: "#888", fontStyle: "italic" }}>
                      세부 메뉴 정보 없음
                    </span>
                  </ItemRow>
                )}
              </ItemsList>
            </OrderItemCard>
          );
        }

        if (!menu) return null;

        const availableItems = getItemsForMenu(order.menuId);
        const allMenuItems = getAllMenuItems(); // 모든 메뉴 아이템 가격 정보

        const selectedItems =
          order.selectedItems ||
          availableItems.map((item) => ({
            name: item.name,
            quantity: item.defaultQuantity || 1,
          }));

        // order.subtotal이 있으면 사용, 없으면 계산
        const totalPrice = order.subtotal ?? calculateOrderItemPrice(order);

        return (
          <OrderItemCard key={order.id}>
            <OrderHeader>
              <div>
                <MenuName>{menuName}</MenuName>
                <StyleInfo>{style.name}</StyleInfo>
              </div>
              <PriceInfo>
                <QuantityBadge>× {order.quantity}</QuantityBadge>
                <Price>{formatPrice(totalPrice)}</Price>
              </PriceInfo>
            </OrderHeader>

            <ItemsList>
              {selectedItems
                .filter((item) => item.quantity > 0)
                .map((selectedItem) => {
                  // 먼저 availableItems에서 찾기
                  let itemData = availableItems.find(
                    (item) => item.name === selectedItem.name
                  );

                  // 없으면 allMenuItems에서 찾기 (다른 디너의 세부 항목)
                  if (!itemData) {
                    itemData = allMenuItems.find(
                      (item) => item.name === selectedItem.name
                    );
                  }

                  const isAdditionalItem = !availableItems.some(
                    (item) => item.name === selectedItem.name
                  );

                  return (
                    <ItemRow key={selectedItem.name}>
                      <span>
                        {selectedItem.name}
                        {isAdditionalItem && (
                          <span
                            style={{
                              fontSize: "0.75em",
                              color: "#888",
                              marginLeft: "4px",
                            }}
                          >
                            (추가)
                          </span>
                        )}{" "}
                        × {selectedItem.quantity}
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
