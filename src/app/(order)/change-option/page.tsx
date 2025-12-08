"use client";

import styled from "@emotion/styled";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { dinnerMenus } from "@/constants/menus";
import { servingStyles } from "@/constants/styles";
import { formatPrice } from "@/utils/format";
import { calculatePriceWithStyle } from "@/utils/calculations";
import { CheckCircle } from "lucide-react";
import OrderCard from "@/components/order/change-option/OrderCard";
import MenuItemOptions from "@/components/order/change-option/MenuItemOptions";
import StyleSelector from "@/components/order/change-option/StyleSelector";
import OptionModal from "@/components/order/change-option/OptionModal";
import ActionButtons from "@/components/order/change-option/ActionButtons";
import {
  getOrders,
  updateOrder,
  deleteOrder,
  OrderItem,
} from "@/storage/order";
import { getItemsForMenu, getAllMenuItems } from "@/utils/menu";
import { ServingStyleType } from "@/types/domain/style";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.headerHeight};
  padding-left: ${({ theme }) => theme.spacing.container};
  padding-right: ${({ theme }) => theme.spacing.container};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export default function ChangeOptionPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEditingOrderId, setCurrentEditingOrderId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const savedOrders = getOrders();
    if (savedOrders.length === 0) {
      router.push("/select-dish");
    } else {
      setOrders(savedOrders);
    }
  }, [router]);

  const handleIncrease = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      updateOrder(orderId, { quantity: order.quantity + 1 });
      setOrders(getOrders());
    }
  };

  const handleDecrease = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order && order.quantity > 1) {
      updateOrder(orderId, { quantity: order.quantity - 1 });
      setOrders(getOrders());
    }
  };

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId);
    const updatedOrders = getOrders();
    if (updatedOrders.length === 0) {
      router.push("/select-dish");
    } else {
      setOrders(updatedOrders);
    }
  };

  const handleAddMenu = () => {
    router.push("/select-dish");
  };

  const handleChangeOption = (orderId: string) => {
    setCurrentEditingOrderId(orderId);
    setShowModal(true);
  };

  const handleIncreaseItem = (itemName: string) => {
    if (!currentEditingOrderId) return;

    // 최신 주문 정보를 로컬 스토리지에서 직접 가져옴
    const allOrders = getOrders();
    const order = allOrders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const currentMenuItems = getItemsForMenu(order.menuId);
    const allMenuItems = getAllMenuItems();
    // 현재 메뉴의 기본 아이템인지 확인
    const isDefaultItem = currentMenuItems.some(
      (item) => item.name === itemName
    );

    const currentItems = order.selectedItems || [];
    const existingItem = currentItems.find((item) => item.name === itemName);

    let newSelectedItems;
    if (existingItem) {
      newSelectedItems = currentItems.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // 기본 메뉴 아이템인 경우 defaultQuantity + 1, 추가 항목인 경우 1 (0에서 +1)
      if (isDefaultItem) {
        const defaultItem = currentMenuItems.find(
          (item) => item.name === itemName
        );
        const defaultQty = defaultItem?.defaultQuantity || 1;
        newSelectedItems = [
          ...currentItems,
          { name: itemName, quantity: defaultQty + 1 },
        ];
      } else {
        // 추가 항목은 0에서 시작하므로 +1하면 1
        newSelectedItems = [...currentItems, { name: itemName, quantity: 1 }];
      }
    }

    updateOrder(currentEditingOrderId, { selectedItems: newSelectedItems });
    // 상태를 즉시 업데이트하기 위해 로컬 스토리지에서 다시 읽어옴
    const updatedOrders = getOrders();
    setOrders(updatedOrders);
  };

  const handleDecreaseItem = (itemName: string) => {
    if (!currentEditingOrderId) return;

    // 최신 주문 정보를 로컬 스토리지에서 직접 가져옴
    const allOrders = getOrders();
    const order = allOrders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const currentItems = order.selectedItems || [];
    const existingItem = currentItems.find((item) => item.name === itemName);

    let newSelectedItems;
    if (existingItem && existingItem.quantity > 0) {
      const newQuantity = existingItem.quantity - 1;
      if (newQuantity === 0) {
        newSelectedItems = currentItems.filter(
          (item) => item.name !== itemName
        );
      } else {
        newSelectedItems = currentItems.map((item) =>
          item.name === itemName ? { ...item, quantity: newQuantity } : item
        );
      }
    } else {
      newSelectedItems = [...currentItems, { name: itemName, quantity: 0 }];
    }

    updateOrder(currentEditingOrderId, { selectedItems: newSelectedItems });
    // 상태를 즉시 업데이트하기 위해 로컬 스토리지에서 다시 읽어옴
    const updatedOrders = getOrders();
    setOrders(updatedOrders);
  };

  const handleRemoveItem = (itemName: string) => {
    if (!currentEditingOrderId) return;

    // 최신 주문 정보를 로컬 스토리지에서 직접 가져옴
    const allOrders = getOrders();
    const order = allOrders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const currentItems = order.selectedItems || [];
    const existingItem = currentItems.find((item) => item.name === itemName);

    let newSelectedItems;
    if (existingItem) {
      newSelectedItems = currentItems.map((item) =>
        item.name === itemName ? { ...item, quantity: 0 } : item
      );
    } else {
      newSelectedItems = [...currentItems, { name: itemName, quantity: 0 }];
    }

    updateOrder(currentEditingOrderId, { selectedItems: newSelectedItems });
    // 상태를 즉시 업데이트하기 위해 로컬 스토리지에서 다시 읽어옴
    const updatedOrders = getOrders();
    setOrders(updatedOrders);
  };

  const handleChangeStyle = (styleType: ServingStyleType) => {
    if (!currentEditingOrderId) return;
    updateOrder(currentEditingOrderId, { style: styleType });
    // 상태를 즉시 업데이트하기 위해 로컬 스토리지에서 다시 읽어옴
    const updatedOrders = getOrders();
    setOrders(updatedOrders);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEditingOrderId(null);
  };

  const handleOrder = () => {
    router.push("/delivery-info");
  };

  // currentEditingOrder를 useMemo로 메모이제이션하여 orders가 업데이트될 때마다 재계산
  // Hooks는 early return 이전에 호출되어야 함
  const currentEditingOrder = useMemo(() => {
    return currentEditingOrderId
      ? orders.find((o) => o.id === currentEditingOrderId) || null
      : null;
  }, [orders, currentEditingOrderId]);

  const currentMenuItems = currentEditingOrder
    ? getItemsForMenu(currentEditingOrder.menuId)
    : [];

  // 모든 디너의 모든 세부 항목 가져오기
  const allMenuItems = getAllMenuItems();

  const currentMenu = currentEditingOrder
    ? dinnerMenus.find((m) => m.id === currentEditingOrder.menuId)
    : null;

  // selectedItems를 useMemo로 메모이제이션하여 currentEditingOrder가 업데이트될 때마다 재계산
  const selectedItemsForModal = useMemo(() => {
    if (!currentEditingOrder) return [];
    return (
      currentEditingOrder.selectedItems ||
      currentMenuItems.map((item) => ({
        name: item.name,
        quantity: item.defaultQuantity || 1,
      }))
    );
  }, [currentEditingOrder, currentMenuItems]);

  if (orders.length === 0) {
    return null;
  }

  const grandTotal = orders.reduce((total, order) => {
    const menu = dinnerMenus.find((m) => m.id === order.menuId);
    if (!menu) return total;

    const basePrice = calculatePriceWithStyle(menu.basePrice, order.style);
    const availableItems = getItemsForMenu(order.menuId);
    const selectedItems =
      order.selectedItems ||
      availableItems.map((item) => ({
        name: item.name,
        quantity: item.defaultQuantity || 1,
      }));

    const itemsPrice = availableItems.reduce((sum, itemData) => {
      const selectedItem = selectedItems.find(
        (si) => si.name === itemData.name
      );
      const quantity = selectedItem
        ? selectedItem.quantity
        : itemData.defaultQuantity || 1;
      const defaultQty = itemData.defaultQuantity || 1;
      return sum + itemData.basePrice * (quantity - defaultQty);
    }, 0);

    return total + (basePrice + itemsPrice) * order.quantity;
  }, 0);

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <CheckCircle size={48} strokeWidth={2} />
            옵션 변경
          </PageTitle>

          <OrdersList>
            {orders.map((order) => {
              const menu = dinnerMenus.find((m) => m.id === order.menuId);
              const style = servingStyles[order.style];

              if (!menu || !style) return null;

              const basePrice = calculatePriceWithStyle(
                menu.basePrice,
                order.style
              );
              const availableItems = getItemsForMenu(order.menuId);

              const selectedItems =
                order.selectedItems ||
                availableItems.map((item) => ({
                  name: item.name,
                  quantity: item.defaultQuantity || 1,
                }));

              const itemsPrice = availableItems.reduce((total, itemData) => {
                const selectedItem = selectedItems.find(
                  (si) => si.name === itemData.name
                );
                const quantity = selectedItem
                  ? selectedItem.quantity
                  : itemData.defaultQuantity || 1;
                const defaultQty = itemData.defaultQuantity || 1;
                return total + itemData.basePrice * (quantity - defaultQty);
              }, 0);

              const totalPrice = (basePrice + itemsPrice) * order.quantity;

              return (
                <OrderCard
                  key={order.id}
                  menu={menu}
                  style={style}
                  basePrice={basePrice}
                  quantity={order.quantity}
                  selectedItems={selectedItems}
                  availableItems={availableItems}
                  totalPrice={totalPrice}
                  onChangeOption={() => handleChangeOption(order.id)}
                  onIncrease={() => handleIncrease(order.id)}
                  onDecrease={() => handleDecrease(order.id)}
                  onDelete={() => handleDelete(order.id)}
                />
              );
            })}
          </OrdersList>

          <ActionButtons
            totalPrice={formatPrice(grandTotal)}
            onAddMenu={handleAddMenu}
            onOrder={handleOrder}
          />
        </ContentWrapper>
      </Main>

      <OptionModal
        show={showModal}
        title="세부 옵션 선택"
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
      >
        {currentEditingOrder && currentMenu && (
          <>
            <StyleSelector
              currentStyle={currentEditingOrder.style}
              availableStyles={currentMenu.availableStyles}
              basePrice={currentMenu.basePrice}
              onSelectStyle={handleChangeStyle}
            />
            <MenuItemOptions
              items={currentMenuItems}
              allItems={allMenuItems}
              selectedItems={selectedItemsForModal}
              onIncreaseItem={handleIncreaseItem}
              onDecreaseItem={handleDecreaseItem}
              onRemoveItem={handleRemoveItem}
            />
          </>
        )}
      </OptionModal>
    </Container>
  );
}
