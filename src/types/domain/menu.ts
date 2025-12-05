import type { ServingStyleType } from "./style";

export interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  items: string[];
  basePrice: number;
  availableStyles: ServingStyleType[];
  image?: string;
}

export interface MenuItemOption {
  name: string;
  basePrice: number;
  defaultQuantity?: number; // 기본 수량 (지정하지 않으면 1)
}

export interface SelectedItem {
  name: string;
  quantity: number;
}

