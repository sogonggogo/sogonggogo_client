import type { DeliveryInfo } from "@/types/domain/order";

export type { DeliveryInfo };

const STORAGE_KEY = "mr-daebak-delivery";

export const getDeliveryInfo = (): DeliveryInfo | null => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveDeliveryInfo = (deliveryInfo: DeliveryInfo): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveryInfo));
  } catch (error) {
    console.error("Failed to save delivery info:", error);
  }
};

export const clearDeliveryInfo = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

