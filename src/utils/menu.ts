import type { MenuItemOption } from "@/types/domain/menu";
import { dinnerMenus } from "@/constants/menus";
import { itemPrices, getItemPriceKey } from "@/constants/prices";

/**
 * 메뉴 ID에 따른 세부 메뉴 옵션 가져오기
 */
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

/**
 * 모든 디너의 모든 세부 항목을 가져오기 (중복 제거)
 * 각 아이템의 가격은 첫 번째로 발견된 메뉴의 가격을 사용
 */
export const getAllMenuItems = (): MenuItemOption[] => {
  const itemMap = new Map<string, MenuItemOption>();

  // 모든 디너를 순회하며 아이템 수집
  dinnerMenus.forEach((menu) => {
    menu.items.forEach((itemName) => {
      // 이미 추가된 아이템이면 건너뛰기 (첫 번째 발견된 가격 사용)
      if (!itemMap.has(itemName)) {
        const priceKey = getItemPriceKey(menu.id, itemName);
        const config = itemPrices[priceKey] || {
          unitPrice: 10000,
          defaultQuantity: 1,
        };
        itemMap.set(itemName, {
          name: itemName,
          basePrice: config.unitPrice,
          defaultQuantity: config.defaultQuantity,
        });
      }
    });
  });

  return Array.from(itemMap.values());
};

