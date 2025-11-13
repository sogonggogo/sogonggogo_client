"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dinnerMenus, formatPrice } from "@/data/menus";
import { servingStyles, calculatePriceWithStyle, ServingStyleType } from "@/data/styles";
import { Settings } from "lucide-react";
import OrderSummary from "@/components/change-option/OrderSummary";
import QuantitySelector from "@/components/change-option/QuantitySelector";
import AdditionalOptions, { AdditionalOption } from "@/components/change-option/AdditionalOptions";
import FinalOrderButton from "@/components/change-option/FinalOrderButton";

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
  max-width: ${({ theme }) => theme.sizes.maxWidth};
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
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const menuId = searchParams.get("menuId");
  const styleType = searchParams.get("style") as ServingStyleType | null;

  const selectedMenu = menuId ? dinnerMenus.find((m) => m.id === Number(menuId)) : null;
  const selectedStyle = styleType ? servingStyles[styleType] : null;

  useEffect(() => {
    if (!selectedMenu || !selectedStyle) {
      router.push("/select-dish");
    }
  }, [selectedMenu, selectedStyle, router]);

  if (!selectedMenu || !selectedStyle) {
    return null;
  }

  const basePrice = calculatePriceWithStyle(selectedMenu.basePrice, styleType!);
  const optionsPrice = selectedOptions.reduce((total, optionId) => {
    const option = additionalOptions.find((opt) => opt.id === optionId);
    return total + (option?.price || 0);
  }, 0);
  const totalPrice = (basePrice + optionsPrice) * quantity;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleToggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleOrder = () => {
    router.push("/");
  };

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Settings size={48} strokeWidth={2} />
            옵션 변경
          </PageTitle>

          <OrderSummary menu={selectedMenu} style={selectedStyle} price={basePrice} />

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <AdditionalOptions
            options={additionalOptions}
            selectedOptions={selectedOptions}
            onToggleOption={handleToggleOption}
          />

          <FinalOrderButton totalPrice={totalPrice} onOrder={handleOrder} />
        </ContentWrapper>
      </Main>
    </Container>
  );
}

