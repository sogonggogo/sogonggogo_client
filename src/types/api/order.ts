// Order API Types

export interface OrderCustomer {
  email: string;
  name: string;
  phone: string;
  isRegularCustomer: boolean;
}

export interface OrderDeliveryInfo {
  address: string;
  date: string;
  time: string;
  cardNumber: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  total: number;
}

export interface OrderMetadata {
  orderDate: string;
  clientOrderId: string;
}

export interface OrderSelectedItem {
  name: string;
  quantity: number;
  unitPrice: number;
  defaultQuantity: number;
  additionalPrice: number;
}

export interface OrderItem {
  menuId: number;
  menuName: string;
  style: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedItems: OrderSelectedItem[];
}

export interface OrderRequest {
  customer: OrderCustomer;
  deliveryInfo: OrderDeliveryInfo;
  pricing: OrderPricing;
  metadata: OrderMetadata;
  orderItems: OrderItem[];
}

export interface OrderResponse {
  id: number;
  status: string;
  customer: OrderCustomer;
  deliveryInfo: OrderDeliveryInfo;
  pricing: OrderPricing;
  metadata: OrderMetadata;
  orderItems: (OrderItem & { id: number })[];
}

