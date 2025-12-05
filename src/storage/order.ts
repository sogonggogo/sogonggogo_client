import type { OrderItem } from "@/types/domain/order";
import type { ServingStyleType } from "@/types/domain/style";
import type { SelectedItem } from "@/types/domain/menu";

export type { OrderItem };

const STORAGE_KEY = "mr-daebak-orders";

export const getOrders = (): OrderItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveOrders = (orders: OrderItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to save orders:", error);
  }
};

export const addOrder = (
  menuId: number,
  style: ServingStyleType,
  initialItems: SelectedItem[]
): string => {
  const orders = getOrders();
  const newOrder: OrderItem = {
    id: `order-${Date.now()}-${Math.random()}`,
    menuId,
    style,
    quantity: 1,
    selectedItems: initialItems,
  };

  orders.push(newOrder);
  saveOrders(orders);
  return newOrder.id;
};

export const updateOrder = (id: string, updates: Partial<OrderItem>): void => {
  const orders = getOrders();
  const index = orders.findIndex((order) => order.id === id);

  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    saveOrders(orders);
  }
};

export const deleteOrder = (id: string): void => {
  const orders = getOrders();
  const filtered = orders.filter((order) => order.id !== id);
  saveOrders(filtered);
};

export const clearOrders = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
