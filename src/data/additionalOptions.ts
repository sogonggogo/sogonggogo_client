import { dinnerMenus } from "./menus";

export interface MenuItemOption {
  name: string;
  basePrice: number;
  defaultQuantity?: number; // 기본 수량 (지정하지 않으면 1)
}

interface ItemPriceConfig {
  unitPrice: number;
  defaultQuantity: number;
}

const itemPrices: Record<string, ItemPriceConfig> = {
  "발렌타인-와인": { unitPrice: 25000, defaultQuantity: 1 },
  "발렌타인-스테이크": { unitPrice: 35000, defaultQuantity: 1 },
  "하트 장식": { unitPrice: 14500, defaultQuantity: 1 },
  "큐피드 장식": { unitPrice: 14500, defaultQuantity: 1 },

  // 프렌치 디너 전용 (총 65,000원)
  "프렌치-커피": { unitPrice: 10000, defaultQuantity: 1 },
  "프렌치-와인": { unitPrice: 20000, defaultQuantity: 1 },
  샐러드: { unitPrice: 15000, defaultQuantity: 1 },
  "프렌치-스테이크": { unitPrice: 20000, defaultQuantity: 1 },

  // 잉글리시 디너 전용 (총 55,000원)
  "에그 스크램블": { unitPrice: 7000, defaultQuantity: 1 },
  베이컨: { unitPrice: 8000, defaultQuantity: 1 },
  빵: { unitPrice: 5000, defaultQuantity: 1 },
  "잉글리시-스테이크": { unitPrice: 35000, defaultQuantity: 1 },

  // 샴페인 축제 디너 전용 (총 120,000원)
  샴페인: { unitPrice: 25000, defaultQuantity: 1 },
  "바게트 빵": { unitPrice: 3750, defaultQuantity: 4 }, // 15,000 / 4 = 3,750
  "샴페인-커피": { unitPrice: 20000, defaultQuantity: 1 },
  "샴페인-와인": { unitPrice: 25000, defaultQuantity: 1 },
  "샴페인-스테이크": { unitPrice: 35000, defaultQuantity: 1 },
};

// 메뉴별 아이템 키 매핑
const getItemPriceKey = (menuId: number, itemName: string): string => {
  switch (menuId) {
    case 1: // 발렌타인
      if (itemName === "와인") return "발렌타인-와인";
      if (itemName === "스테이크") return "발렌타인-스테이크";
      return itemName;
    case 2: // 프렌치
      if (itemName === "커피") return "프렌치-커피";
      if (itemName === "와인") return "프렌치-와인";
      if (itemName === "스테이크") return "프렌치-스테이크";
      return itemName;
    case 3: // 잉글리시
      if (itemName === "스테이크") return "잉글리시-스테이크";
      return itemName;
    case 4: // 샴페인
      if (itemName === "커피") return "샴페인-커피";
      if (itemName === "와인") return "샴페인-와인";
      if (itemName === "스테이크") return "샴페인-스테이크";
      return itemName;
    default:
      return itemName;
  }
};

// 메뉴 ID에 따른 세부 메뉴 옵션 가져오기
export const getItemsForMenu = (menuId: number): MenuItemOption[] => {
  const menu = dinnerMenus.find((m) => m.id === menuId);
  if (!menu) return [];

  return menu.items.map((itemName) => {
    const priceKey = getItemPriceKey(menuId, itemName);
    const config = itemPrices[priceKey] || {
      unitPrice: 10000,
      defaultQuantity: 1,
    };
    return {
      name: itemName,
      basePrice: config.unitPrice,
      defaultQuantity: config.defaultQuantity,
    };
  });
};

export interface SelectedItem {
  name: string;
  quantity: number;
}
