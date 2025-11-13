"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dinnerMenus } from "@/data/menus";
import { servingStyles, calculatePriceWithStyle } from "@/data/styles";
import { CheckCircle } from "lucide-react";
import OrderCard from "@/components/change-option/OrderCard";
import AdditionalOptions, {
  AdditionalOption,
} from "@/components/change-option/AdditionalOptions";
import {
  getOrders,
  updateOrder,
  deleteOrder,
  clearOrders,
  OrderItem,
} from "@/utils/orderStorage";

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
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
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
`;

const ConfirmButton = styled(OrderButton)`
  margin-top: 0;
`;

// 추가 옵션 데이터
const additionalOptions: AdditionalOption[] = [
  { id: "wine-extra", name: "와인 추가 (1병)", price: 30000 },
  { id: "dessert", name: "디저트 세트", price: 15000 },
  { id: "coffee", name: "커피 세트", price: 10000 },
  { id: "candle", name: "촛불 세팅", price: 5000 },
  { id: "flower", name: "꽃다발", price: 20000 },
];

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

  const handleToggleOption = (optionId: string) => {
    if (!currentEditingOrderId) return;

    const order = orders.find((o) => o.id === currentEditingOrderId);
    if (!order) return;

    const newSelectedOptions = order.selectedOptions.includes(optionId)
      ? order.selectedOptions.filter((id) => id !== optionId)
      : [...order.selectedOptions, optionId];

    updateOrder(currentEditingOrderId, {
      selectedOptions: newSelectedOptions,
    });
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
              const selectedOptionsData = order.selectedOptions
                .map((id) => additionalOptions.find((opt) => opt.id === id))
                .filter((opt) => opt !== undefined) as AdditionalOption[];
              const optionsPrice = selectedOptionsData.reduce(
                (total, option) => total + option.price,
                0
              );
              const totalPrice = (basePrice + optionsPrice) * order.quantity;

              return (
                <OrderCard
                  key={order.id}
                  menu={menu}
                  style={style}
                  basePrice={basePrice}
                  quantity={order.quantity}
                  selectedOptions={selectedOptionsData}
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
            <OrderButton onClick={handleOrder}>주문하기</OrderButton>
          </ButtonGroup>
        </ContentWrapper>
      </Main>

      <ModalOverlay show={showModal} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>추가 옵션 선택</ModalTitle>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
          </ModalHeader>
          {currentEditingOrder && (
            <AdditionalOptions
              options={additionalOptions}
              selectedOptions={currentEditingOrder.selectedOptions}
              onToggleOption={handleToggleOption}
            />
          )}
          <ModalFooter>
            <ConfirmButton onClick={handleCloseModal}>확인</ConfirmButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}
