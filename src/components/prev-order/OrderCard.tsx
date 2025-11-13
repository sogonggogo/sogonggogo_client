"use client";

import styled from "@emotion/styled";
import { formatPrice } from "@/data/menus";
import { Clock, MapPin, Calendar } from "lucide-react";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const OrderStatus = styled.span<{
  status: "completed" | "pending" | "cancelled";
}>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ status, theme }) =>
    status === "completed"
      ? theme.colors.primary
      : status === "pending"
      ? theme.colors.secondary
      : theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
`;

const OrderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OrderDetails = styled.div`
  flex: 1;
`;

const MenuName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyleInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ItemTag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.buttonBackground};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const OrderPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
`;

const DeliveryInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DeliveryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
`;

const DeliveryLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  min-width: 70px;
`;

const DeliveryValue = styled.span`
  flex: 1;
`;

const OrderFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterButton = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  background: ${({ variant, theme }) =>
    variant === "primary" ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ variant, theme }) =>
    variant === "primary" ? theme.colors.white : theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

interface Order {
  id: string | number;
  date: string;
  menuName: string;
  style: string;
  items: string[];
  price: number;
  status: "completed" | "pending" | "cancelled";
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryTime?: string;
}

interface OrderCardProps {
  order: Order;
  onViewDetails: (id: string | number) => void;
  onReorder: (menuName: string, style: string) => void;
}

export default function OrderCard({
  order,
  onViewDetails,
  onReorder,
}: OrderCardProps) {
  return (
    <Card>
      <OrderHeader>
        <OrderDate>
          <Clock size={20} />
          <span>{order.date}</span>
        </OrderDate>
        <OrderStatus status={order.status}>
          {order.status === "completed" ? "완료" : "진행중"}
        </OrderStatus>
      </OrderHeader>

      <OrderContent>
        <OrderDetails>
          <MenuName>{order.menuName}</MenuName>
          <StyleInfo>{order.style} 스타일</StyleInfo>
          <ItemsList>
            {order.items.map((item, index) => (
              <ItemTag key={index}>{item}</ItemTag>
            ))}
          </ItemsList>
        </OrderDetails>
        <OrderPrice>{formatPrice(order.price)}</OrderPrice>
      </OrderContent>

      {(order.deliveryAddress || order.deliveryDate || order.deliveryTime) && (
        <DeliveryInfo>
          {order.deliveryAddress && (
            <DeliveryRow>
              <MapPin size={16} />
              <DeliveryLabel>배달 주소:</DeliveryLabel>
              <DeliveryValue>{order.deliveryAddress}</DeliveryValue>
            </DeliveryRow>
          )}
          {order.deliveryDate && (
            <DeliveryRow>
              <Calendar size={16} />
              <DeliveryLabel>도착 날짜:</DeliveryLabel>
              <DeliveryValue>{order.deliveryDate}</DeliveryValue>
            </DeliveryRow>
          )}
          {order.deliveryTime && (
            <DeliveryRow>
              <Clock size={16} />
              <DeliveryLabel>도착 시각:</DeliveryLabel>
              <DeliveryValue>{order.deliveryTime}</DeliveryValue>
            </DeliveryRow>
          )}
        </DeliveryInfo>
      )}

      <OrderFooter>
        <FooterButton onClick={() => onViewDetails(order.id)}>
          상세 보기
        </FooterButton>
        <FooterButton
          variant="primary"
          onClick={() => onReorder(order.menuName, order.style)}
        >
          다시 주문
        </FooterButton>
      </OrderFooter>
    </Card>
  );
}

