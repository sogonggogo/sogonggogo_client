import type { OrderHistory, OrderStatusType } from "@/types/domain/order";

export type { OrderHistory, OrderStatusType };

const STORAGE_KEY = "mr-daebak-order-history";

export const getOrderHistory = (): OrderHistory[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveOrderHistory = (orderHistories: OrderHistory[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderHistories));
  } catch (error) {
    console.error("Failed to save order history:", error);
  }
};

export const addOrderHistory = (
  orderHistory: Omit<OrderHistory, "id">
): void => {
  const histories = getOrderHistory();
  const newHistory: OrderHistory = {
    ...orderHistory,
    id: `order-history-${Date.now()}-${Math.random()}`,
  };

  histories.unshift(newHistory); // Add to the beginning of the array
  saveOrderHistory(histories);
};
