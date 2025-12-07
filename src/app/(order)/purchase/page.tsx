"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Tag } from "lucide-react";
import { getOrders, clearOrders } from "@/storage/order";
import { getDeliveryInfo, clearDeliveryInfo } from "@/storage/delivery";
import { getUserInfo, isRegularCustomer } from "@/storage/user";
import { addOrderHistory } from "@/storage/orderHistory";
import { dinnerMenus } from "@/constants/menus";
import { formatPrice } from "@/utils/format";
import { calculatePriceWithStyle } from "@/utils/calculations";
import { getItemsForMenu } from "@/utils/menu";
import OrderSummary from "@/components/order/purchase/OrderSummary";
import DeliveryInfoDisplay from "@/components/order/purchase/DeliveryInfoDisplay";
import PriceSummary from "@/components/order/purchase/PriceSummary";
import { orderApi } from "@/services/order";
import type { OrderRequest } from "@/types/api/order";
import { userApi } from "@/services/user";

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
  max-width: 1000px;
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

const DiscountBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  margin-left: ${({ theme }) => theme.spacing.md};
`;

const SectionContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `
      : `
    background: ${theme.colors.white};
    color: ${theme.colors.accent};
    border: 2px solid ${theme.colors.border};

    &:hover {
      background: ${theme.colors.buttonBackground};
    }
  `}
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
`;

export default function PurchasePage() {
  const router = useRouter();
  const [orders, setOrders] = useState(getOrders());
  const [deliveryInfo, setDeliveryInfo] = useState(getDeliveryInfo());
  const [isRegular, setIsRegular] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedOrders = getOrders();
    const savedDelivery = getDeliveryInfo();

    if (savedOrders.length === 0 || !savedDelivery) {
      router.push("/select-dish");
      return;
    }

    setOrders(savedOrders);
    setDeliveryInfo(savedDelivery);
    setIsRegular(isRegularCustomer());
  }, [router]);

  if (orders.length === 0 || !deliveryInfo) {
    return (
      <Container>
        <Main>
          <ErrorMessage>
            주문 정보가 없습니다. 메뉴를 선택해주세요.
          </ErrorMessage>
        </Main>
      </Container>
    );
  }

  // Calculate total price
  const subtotal = orders.reduce((total, order) => {
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

  const discount = isRegular ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleCancel = () => {
    router.push("/delivery-info");
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 사용자 정보 가져오기
      let customerInfo;
      try {
        const userResponse = await userApi.getMe();
        if (userResponse) {
          // 로그인 상태인 경우
          customerInfo = userResponse;
        } else {
          // 로그아웃 상태인 경우 로컬 스토리지에서 가져오기
          const localUser = getUserInfo();
          if (!localUser) {
            alert("사용자 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.");
            setIsProcessing(false);
            return;
          }
          customerInfo = {
            email: localUser.email || "",
            name: localUser.name || "",
            phone: localUser.phone || "",
            isRegularCustomer: localUser.isRegularCustomer || false,
          };
        }
      } catch {
        // API 실패 시 로컬 스토리지에서 가져오기
        const localUser = getUserInfo();
        if (!localUser) {
          alert("사용자 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.");
          setIsProcessing(false);
          return;
        }
        customerInfo = {
          email: localUser.email || "",
          name: localUser.name || "",
          phone: localUser.phone || "",
          isRegularCustomer: localUser.isRegularCustomer || false,
        };
      }

      // 주문 아이템 변환
      const orderItems = orders.map((order) => {
        const menu = dinnerMenus.find((m) => m.id === order.menuId);
        if (!menu) throw new Error("메뉴를 찾을 수 없습니다.");

        const basePrice = calculatePriceWithStyle(menu.basePrice, order.style);
        const availableItems = getItemsForMenu(order.menuId);
        const selectedItems =
          order.selectedItems ||
          availableItems.map((item) => ({
            name: item.name,
            quantity: item.defaultQuantity || 1,
          }));

        // selectedItems를 API 형식으로 변환
        // 수량이 0인 아이템도 포함 (재주문 시 정확한 복원을 위해)
        const apiSelectedItems = selectedItems.map((si) => {
          const itemData = availableItems.find((i) => i.name === si.name);
          if (!itemData)
            throw new Error(`아이템을 찾을 수 없습니다: ${si.name}`);

          const defaultQty = itemData.defaultQuantity || 1;
          const additionalQty = si.quantity - defaultQty;
          const additionalPrice =
            Math.max(0, additionalQty) * itemData.basePrice;

          return {
            name: si.name,
            quantity: si.quantity,
            unitPrice: itemData.basePrice,
            defaultQuantity: defaultQty,
            additionalPrice: additionalPrice,
          };
        });

        // 아이템 추가 가격 계산
        const itemsPrice = apiSelectedItems.reduce(
          (sum, item) => sum + item.additionalPrice,
          0
        );

        const unitPrice = basePrice + itemsPrice;
        const totalPrice = unitPrice * order.quantity;

        return {
          menuId: order.menuId,
          menuName: menu.name,
          style: order.style,
          quantity: order.quantity,
          unitPrice: unitPrice,
          totalPrice: totalPrice,
          selectedItems: apiSelectedItems,
        };
      });

      // clientOrderId 생성
      const clientOrderId = `order-${Date.now()}-${Math.random()}`;

      // API 요청 데이터 생성
      const orderRequest: OrderRequest = {
        customer: {
          email: customerInfo.email,
          name: customerInfo.name,
          phone: customerInfo.phone,
          isRegularCustomer: customerInfo.isRegularCustomer,
        },
        deliveryInfo: {
          address: deliveryInfo!.address,
          date: deliveryInfo!.date,
          time: deliveryInfo!.time,
          cardNumber: deliveryInfo!.cardNumber.replace(/\s/g, ""), // 공백 제거
        },
        pricing: {
          subtotal: subtotal,
          discount: discount,
          total: total,
        },
        metadata: {
          orderDate: new Date().toISOString(),
          clientOrderId: clientOrderId,
        },
        orderItems: orderItems,
      };

      // API 호출
      const orderResponse = await orderApi.createOrder(orderRequest);

      // 로컬 스토리지에도 저장 (주문 내역 페이지용)
      if (deliveryInfo) {
        // API 응답의 status를 로컬 타입으로 변환
        const localStatus = orderResponse.status.toLowerCase() as
          | "completed"
          | "pending"
          | "cancelled";

        addOrderHistory({
          orderDate: orderResponse.metadata.orderDate,
          orders: orders,
          deliveryInfo: deliveryInfo,
          subtotal: orderResponse.pricing.subtotal,
          discount: orderResponse.pricing.discount,
          total: orderResponse.pricing.total,
          isRegularCustomer: orderResponse.customer.isRegularCustomer,
          status:
            localStatus === "completed" ||
            localStatus === "pending" ||
            localStatus === "cancelled"
              ? localStatus
              : "pending",
        });
      }

      // Clear all stored data
      clearOrders();
      clearDeliveryInfo();

      // Redirect to order complete page
      router.push("/order-complete");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "주문 처리 중 오류가 발생했습니다.";
      alert(errorMessage);
      setIsProcessing(false);
    }
  };

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <CreditCard size={48} strokeWidth={2} />
            결제하기
            {isRegular && (
              <DiscountBadge>
                <Tag size={20} />
                단골 고객 10% 할인
              </DiscountBadge>
            )}
          </PageTitle>

          <SectionContainer>
            <SectionTitle>주문 정보</SectionTitle>
            <OrderSummary orders={orders} />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>배달 정보</SectionTitle>
            <DeliveryInfoDisplay deliveryInfo={deliveryInfo} />
          </SectionContainer>

          <SectionContainer>
            <PriceSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              isRegular={isRegular}
            />

            <ButtonGroup>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isProcessing}
              >
                취소
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "결제 진행 중..."
                  : formatPrice(total) + " 결제하기"}
              </Button>
            </ButtonGroup>
          </SectionContainer>
        </ContentWrapper>
      </Main>
    </Container>
  );
}
