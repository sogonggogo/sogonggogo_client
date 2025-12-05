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

