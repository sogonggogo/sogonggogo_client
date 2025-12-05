"use client";

import styled from "@emotion/styled";
import { MapPin, Calendar, Clock, CreditCard, Package } from "lucide-react";
import { OrderHistory } from "@/storage/orderHistory";
import { dinnerMenus } from "@/constants/menus";
import { formatPrice } from "@/utils/format";
import { servingStyles } from "@/constants/styles";
import { getItemsForMenu } from "@/utils/menu";

const SummaryContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const OrderItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MenuName = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const MenuStyle = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Quantity = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ItemTag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  color: ${({ theme }) => theme.colors.accent};
`;

const InfoLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  min-width: 80px;
`;

const InfoValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  flex: 1;
`;

const PriceSection = styled.div`
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const PriceRow = styled.div<{ isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-family: ${({ theme }) => theme.fontFamily.miwon};

  ${({ isTotal, theme }) =>
    isTotal
      ? `
    font-size: ${theme.fontSize.xxl};
    font-weight: ${theme.fontWeight.black};
    color: ${theme.colors.primary};
    padding-top: ${theme.spacing.md};
    margin-top: ${theme.spacing.sm};
    border-top: 2px solid ${theme.colors.border};
  `
      : `
    font-size: ${theme.fontSize.lg};
    color: ${theme.colors.accent};
  `}
`;

const DiscountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

interface OrderCompleteSummaryProps {
  order: OrderHistory;
}

// Helper function to format delivery date
const formatDeliveryDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
};

// Helper function to mask card number
const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, "");
  if (cleaned.length !== 16) return cardNumber;
  return `${cleaned.slice(0, 4)} **** **** ${cleaned.slice(12, 16)}`;
};

export default function OrderCompleteSummary({
  order,
}: OrderCompleteSummaryProps) {
  return (
    <SummaryContainer>
      {/* Order Items */}
      <Section>
        <SectionTitle>
          <Package size={24} />
          주문 내역
        </SectionTitle>
        {order.orders.map((orderItem, index) => {
          const menu = dinnerMenus.find((m) => m.id === orderItem.menuId);
          const style = servingStyles[orderItem.style];

          if (!menu || !style) return null;

          const availableItems = getItemsForMenu(orderItem.menuId);
          const selectedItems =
            orderItem.selectedItems ||
            availableItems.map((item) => ({
              name: item.name,
              quantity: item.defaultQuantity || 1,
            }));

          return (
            <OrderItem key={index}>
              <MenuInfo>
                <div>
                  <MenuName>{menu.name}</MenuName>
                  <MenuStyle>{style.name} 스타일</MenuStyle>
                </div>
                <Quantity>× {orderItem.quantity}</Quantity>
              </MenuInfo>
              <ItemsList>
                {selectedItems
                  .filter((item) => item.quantity > 0)
                  .map((item, idx) => {
                    const itemData = availableItems.find(
                      (i) => i.name === item.name
                    );
                    if (!itemData) return null;
                    return (
                      <ItemTag key={idx}>
                        {item.name}
                        {item.quantity > 1 && ` X${item.quantity}`}
                      </ItemTag>
                    );
                  })}
              </ItemsList>
            </OrderItem>
          );
        })}
      </Section>

      {/* Delivery Information */}
      <Section>
        <SectionTitle>
          <MapPin size={24} />
          배달 정보
        </SectionTitle>
        <InfoRow>
          <MapPin size={18} />
          <InfoLabel>배달 주소:</InfoLabel>
          <InfoValue>{order.deliveryInfo.address}</InfoValue>
        </InfoRow>
        <InfoRow>
          <Calendar size={18} />
          <InfoLabel>도착 날짜:</InfoLabel>
          <InfoValue>{formatDeliveryDate(order.deliveryInfo.date)}</InfoValue>
        </InfoRow>
        <InfoRow>
          <Clock size={18} />
          <InfoLabel>도착 시각:</InfoLabel>
          <InfoValue>{order.deliveryInfo.time}</InfoValue>
        </InfoRow>
        <InfoRow>
          <CreditCard size={18} />
          <InfoLabel>결제 카드:</InfoLabel>
          <InfoValue>{maskCardNumber(order.deliveryInfo.cardNumber)}</InfoValue>
        </InfoRow>
      </Section>

      {/* Price Summary */}
      <PriceSection>
        <PriceRow>
          <span>주문 금액</span>
          <span>{formatPrice(order.subtotal)}</span>
        </PriceRow>

        {order.isRegularCustomer && order.discount > 0 && (
          <PriceRow>
            <span>
              단골 고객 할인 (10%)
              <DiscountBadge>단골 혜택</DiscountBadge>
            </span>
            <span style={{ color: "#ffa500" }}>
              - {formatPrice(order.discount)}
            </span>
          </PriceRow>
        )}

        <PriceRow isTotal>
          <span>최종 결제 금액</span>
          <span>{formatPrice(order.total)}</span>
        </PriceRow>
      </PriceSection>
    </SummaryContainer>
  );
}
