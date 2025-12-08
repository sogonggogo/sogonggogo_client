import type { OrderItem } from "@/types/domain/order";
import { dinnerMenus } from "@/constants/menus";
import { calculatePriceWithStyle } from "@/utils/calculations";
import { getItemsForMenu, getAllMenuItems } from "@/utils/menu";

/**
 * OrderSummary에서 사용하는 것과 동일한 로직으로 주문 항목의 가격을 계산
 */
export const calculateOrderItemPrice = (order: OrderItem): number => {
  // voice-order에서 추가된 메뉴인지 확인 (menuName이 있고 menuId < 0)
  const isVoiceOrderAdditionalMenu = order.menuName && order.menuId < 0;

  // voice-order에서 추가된 메뉴인 경우
  if (isVoiceOrderAdditionalMenu) {
    return 0; // 실제로는 API에서 가격 정보를 받아야 함
  }

  // 기존 메뉴 찾기
  const menu =
    order.menuId > 0 && order.menuId <= 4
      ? dinnerMenus.find((m) => m.id === order.menuId)
      : null;

  if (!menu) {
    return 0;
  }

  const basePrice = calculatePriceWithStyle(menu.basePrice, order.style);
  const availableItems = getItemsForMenu(order.menuId);
  const allMenuItems = getAllMenuItems(); // 모든 메뉴 아이템 가격 정보

  const selectedItems =
    order.selectedItems ||
    availableItems.map((item) => ({
      name: item.name,
      quantity: item.defaultQuantity || 1,
    }));

  // selectedItems에 있는 모든 항목의 가격 계산 (availableItems에 없는 추가 항목 포함)
  const itemsPrice = selectedItems.reduce((total, selectedItem) => {
    if (selectedItem.quantity === 0) return total;

    // 먼저 availableItems에서 찾기
    let itemData = availableItems.find(
      (item) => item.name === selectedItem.name
    );

    // 없으면 allMenuItems에서 찾기 (다른 디너의 세부 항목)
    if (!itemData) {
      itemData = allMenuItems.find((item) => item.name === selectedItem.name);
    }

    // 여전히 없으면 기본 가격 사용
    const baseItemPrice = itemData?.basePrice || 10000;
    const defaultQty = itemData?.defaultQuantity || 1;
    const quantity = selectedItem.quantity;

    return total + baseItemPrice * (quantity - defaultQty);
  }, 0);

  return (basePrice + itemsPrice) * order.quantity;
};

