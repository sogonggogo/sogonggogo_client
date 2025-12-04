const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

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

class OrderApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 주문 생성
   * POST /api/orders
   */
  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    const response = await fetch(`${this.baseUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      credentials: "include", // 세션 쿠키 포함
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("주문 정보가 올바르지 않습니다.");
      }
      if (response.status === 401) {
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`주문 생성 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 주문 목록 조회 (Staff용)
   * GET /api/staff/orders?status=PENDING
   */
  async getOrders(status?: string): Promise<OrderResponse[]> {
    const url = status
      ? `${this.baseUrl}/api/staff/orders?status=${status}`
      : `${this.baseUrl}/api/staff/orders`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`주문 목록 조회 실패: ${response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
export const orderApi = new OrderApiService();

export default orderApi;

