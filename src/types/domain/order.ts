import type { ServingStyleType } from "./style";
import type { SelectedItem } from "./menu";

export interface OrderItem {
  id: string;
  menuId: number;
  style: ServingStyleType;
  quantity: number;
  selectedItems: SelectedItem[];
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

