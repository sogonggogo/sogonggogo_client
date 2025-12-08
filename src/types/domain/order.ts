import type { ServingStyleType } from "./style";
import type { SelectedItem } from "./menu";

export interface OrderItem {
  id: string;
  menuId: number;
  menuName?: string; // 음성 주문 등에서 추가된 메뉴의 이름 (기존 메뉴에 없을 경우)
  style: ServingStyleType;
  quantity: number;
  selectedItems: SelectedItem[];
  subtotal?: number; // OrderSummary에서 계산한 가격
}

export type OrderStatusType =
  | "PENDING"
  | "APPROVED"
  | "COOKING"
  | "READY_FOR_DELIVERY"
  | "IN_DELIVERY"
  | "COMPLETED"
  | "REJECTED";

export interface DeliveryInfo {
  address: string;
  date: string;
  time: string;
  cardNumber: string;
}

export interface OrderHistory {
  id: string;
  orderDate: string; // ISO date string
  orders: OrderItem[];
  deliveryInfo: DeliveryInfo;
  subtotal: number;
  discount: number;
  total: number;
  isRegularCustomer: boolean;
  status: OrderStatusType | string; // string for backward compatibility
}

