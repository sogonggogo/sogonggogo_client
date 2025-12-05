interface ItemPriceConfig {
  unitPrice: number;
  defaultQuantity: number;
}

export const itemPrices: Record<string, ItemPriceConfig> = {
  "발렌타인-와인": { unitPrice: 25000, defaultQuantity: 1 },
  "발렌타인-스테이크": { unitPrice: 35000, defaultQuantity: 1 },
  "하트 장식": { unitPrice: 14500, defaultQuantity: 1 },
  "큐피드 장식": { unitPrice: 14500, defaultQuantity: 1 },

  // 프렌치 디너 전용
  "프렌치-커피": { unitPrice: 15000, defaultQuantity: 1 },
  "프렌치-와인": { unitPrice: 25000, defaultQuantity: 1 },
  샐러드: { unitPrice: 15000, defaultQuantity: 1 },
  "프렌치-스테이크": { unitPrice: 35000, defaultQuantity: 1 },

  // 잉글리시 디너 전용
  "에그 스크램블": { unitPrice: 7000, defaultQuantity: 1 },
  베이컨: { unitPrice: 8000, defaultQuantity: 1 },
  빵: { unitPrice: 5000, defaultQuantity: 1 },
  "잉글리시-스테이크": { unitPrice: 35000, defaultQuantity: 1 },

  // 샴페인 축제 디너 전용
  샴페인: { unitPrice: 25000, defaultQuantity: 1 },
  "바게트 빵": { unitPrice: 4000, defaultQuantity: 4 }, // 16,000 / 4 = 4,000
  "샴페인-커피": { unitPrice: 15000, defaultQuantity: 1 },
  "샴페인-와인": { unitPrice: 25000, defaultQuantity: 1 },
  "샴페인-스테이크": { unitPrice: 35000, defaultQuantity: 1 },
};

// 메뉴별 아이템 키 매핑
export const getItemPriceKey = (menuId: number, itemName: string): string => {
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

