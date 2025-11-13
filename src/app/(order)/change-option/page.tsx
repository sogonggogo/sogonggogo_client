"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dinnerMenus, formatPrice } from "@/data/menus";
import { servingStyles, calculatePriceWithStyle } from "@/data/styles";
import { CheckCircle } from "lucide-react";
import OrderCard from "@/components/change-option/OrderCard";
import MenuItemOptions from "@/components/change-option/MenuItemOptions";
import StyleSelector from "@/components/change-option/StyleSelector";
import {
  getOrders,
  updateOrder,
  deleteOrder,
  clearOrders,
  OrderItem,
} from "@/utils/orderStorage";
import { getItemsForMenu, SelectedItem } from "@/data/additionalOptions";
import { ServingStyleType } from "@/data/styles";

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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AddMenuButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackground};
  }
`;

const OrderButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing.xs};

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accentAlpha70};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const ModalFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`;

const ConfirmButton = styled(OrderButton)`
  margin-top: 0;
`;

export default function ChangeOptionPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEditingOrderId, setCurrentEditingOrderId] = useState<
    string | null
  >(null);

  useEffect(() => {
    // localStorage에서 주문 목록 불러오기
    const savedOrders = getOrders();
    if (savedOrders.length === 0) {
      // 주문이 없으면 select-dish로 리다이렉트
      router.push("/select-dish");
    } else {
      setOrders(savedOrders);
    }
  }, [router]);

  const handleIncrease = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      const newQuantity = order.quantity + 1;
      updateOrder(orderId, { quantity: newQuantity });
      setOrders(getOrders());
    }
  };

  const handleDecrease = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order && order.quantity > 1) {
      const newQuantity = order.quantity - 1;
      updateOrder(orderId, { quantity: newQuantity });
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

    const order = orders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const currentItems = order.selectedItems || [];
    const existingItem = currentItems.find((item) => item.name === itemName);

    let newSelectedItems;
    if (existingItem) {
      // 이미 존재하면 수량 증가
      newSelectedItems = currentItems.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // 없으면 새로 추가
      newSelectedItems = [...currentItems, { name: itemName, quantity: 2 }];
    }

    updateOrder(currentEditingOrderId, { selectedItems: newSelectedItems });
    setOrders(getOrders());
  };

  const handleDecreaseItem = (itemName: string) => {
    if (!currentEditingOrderId) return;

    const order = orders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const currentItems = order.selectedItems || [];
    const existingItem = currentItems.find((item) => item.name === itemName);

    let newSelectedItems;
    if (existingItem && existingItem.quantity > 0) {
      // 수량이 0보다 크면 감소
      const newQuantity = existingItem.quantity - 1;
      if (newQuantity === 0) {
        // 0이 되면 제거
        newSelectedItems = currentItems.filter(
          (item) => item.name !== itemName
        );
      } else {
        // 0보다 크면 수량 감소
        newSelectedItems = currentItems.map((item) =>
          item.name === itemName ? { ...item, quantity: newQuantity } : item
        );
      }
    } else {
      // 아이템이 없으면 수량 0으로 추가 (선택 해제 상태)
      newSelectedItems = [...currentItems, { name: itemName, quantity: 0 }];
    }

    updateOrder(currentEditingOrderId, { selectedItems: newSelectedItems });
    setOrders(getOrders());
  };

  const handleRemoveItem = (itemName: string) => {
    if (!currentEditingOrderId) return;

    const order = orders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const currentItems = order.selectedItems || [];
    const existingItem = currentItems.find((item) => item.name === itemName);

    let newSelectedItems;
    if (existingItem) {
      // 이미 있으면 수량을 0으로 설정
      newSelectedItems = currentItems.map((item) =>
        item.name === itemName ? { ...item, quantity: 0 } : item
      );
    } else {
      // 없으면 수량 0으로 추가
      newSelectedItems = [...currentItems, { name: itemName, quantity: 0 }];
    }

    updateOrder(currentEditingOrderId, { selectedItems: newSelectedItems });
    setOrders(getOrders());
  };

  const handleChangeStyle = (styleType: ServingStyleType) => {
    if (!currentEditingOrderId) return;

    updateOrder(currentEditingOrderId, { style: styleType });
    setOrders(getOrders());
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEditingOrderId(null);
  };

  const handleOrder = () => {
    clearOrders();
    router.push("/");
  };

  if (orders.length === 0) {
    return null; // 로딩 중이거나 리다이렉트 대기
  }

  const currentEditingOrder = currentEditingOrderId
    ? orders.find((o) => o.id === currentEditingOrderId)
    : null;

  const currentMenuItems = currentEditingOrder
    ? getItemsForMenu(currentEditingOrder.menuId)
    : [];

  const currentMenu = currentEditingOrder
    ? dinnerMenus.find((m) => m.id === currentEditingOrder.menuId)
    : null;

  // 전체 주문 총액 계산
  const grandTotal = orders.reduce((total, order) => {
    const menu = dinnerMenus.find((m) => m.id === order.menuId);
    if (!menu) return total;

    const basePrice = calculatePriceWithStyle(menu.basePrice, order.style);
    const availableItems = getItemsForMenu(order.menuId);
    const selectedItems =
      order.selectedItems ||
      availableItems.map((item) => ({ name: item.name, quantity: 1 }));

    // 모든 아이템을 기준으로 가격 계산
    const itemsPrice = availableItems.reduce((sum, itemData) => {
      const selectedItem = selectedItems.find(
        (si) => si.name === itemData.name
      );
      const quantity = selectedItem ? selectedItem.quantity : 1; // 없으면 기본 1
      // 기본 수량(1) 기준으로 차이만 계산
      return sum + itemData.basePrice * (quantity - 1);
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

              // 선택된 아이템들의 가격 계산
              // selectedItems가 없으면 모든 아이템을 각각의 기본 수량으로 사용
              const selectedItems =
                order.selectedItems ||
                availableItems.map((item) => ({
                  name: item.name,
                  quantity: item.defaultQuantity || 1,
                }));

              // 모든 아이템을 기준으로 가격 계산
              const itemsPrice = availableItems.reduce((total, itemData) => {
                const selectedItem = selectedItems.find(
                  (si) => si.name === itemData.name
                );
                const quantity = selectedItem
                  ? selectedItem.quantity
                  : itemData.defaultQuantity || 1;
                const defaultQty = itemData.defaultQuantity || 1;
                // 기본 수량 기준으로 차이만 계산
                // 예: 바게트 빵 기본4 → quantity=3이면 -3750, quantity=5이면 +3750
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

          <ButtonGroup>
            <AddMenuButton onClick={handleAddMenu}>+ 메뉴 추가</AddMenuButton>
            <OrderButton onClick={handleOrder}>
              {formatPrice(grandTotal)} 주문하기
            </OrderButton>
          </ButtonGroup>
        </ContentWrapper>
      </Main>

      <ModalOverlay show={showModal} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>세부 옵션 선택</ModalTitle>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
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
                  selectedItems={
                    currentEditingOrder.selectedItems ||
                    currentMenuItems.map((item) => ({
                      name: item.name,
                      quantity: item.defaultQuantity || 1,
                    }))
                  }
                  onIncreaseItem={handleIncreaseItem}
                  onDecreaseItem={handleDecreaseItem}
                  onRemoveItem={handleRemoveItem}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <ConfirmButton onClick={handleCloseModal}>확인</ConfirmButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}
