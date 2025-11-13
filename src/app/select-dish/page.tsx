"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { dinnerMenus, formatPrice } from "@/data/menus";
import {
  servingStyles,
  calculatePriceWithStyle,
  ServingStyleType,
} from "@/data/styles";
import { ShoppingCart } from "lucide-react";
import MenuGrid from "@/components/select-dish/MenuGrid";
import StyleSelector from "@/components/select-dish/StyleSelector";
import OrderButton from "@/components/select-dish/OrderButton";

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

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export default function SelectDishPage() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] =
    useState<ServingStyleType>("simple");

  const selectedMenuData =
    selectedMenu !== null
      ? dinnerMenus.find((m) => m.id === selectedMenu)
      : null;

  const finalPrice = selectedMenuData
    ? calculatePriceWithStyle(selectedMenuData.basePrice, selectedStyle)
    : 0;

  const handleOrder = () => {
    if (!selectedMenuData) {
      alert("메뉴를 선택해주세요!");
      return;
    }
    alert(
      `주문이 완료되었습니다!\n${selectedMenuData.name} (${
        servingStyles[selectedStyle].name
      })\n${formatPrice(finalPrice)}`
    );
  };

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <ShoppingCart size={48} strokeWidth={2} />
            일반주문
          </PageTitle>

          {/* 메뉴 선택 */}
          <SectionTitle>메뉴 선택</SectionTitle>
          <MenuGrid
            menus={dinnerMenus}
            selectedMenuId={selectedMenu}
            onSelectMenu={setSelectedMenu}
          />

          {/* 서빙 스타일 선택 */}
          {selectedMenuData && (
            <StyleSelector
              selectedMenu={selectedMenuData}
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
            />
          )}

          {/* 주문 버튼 */}
          <OrderButton onClick={handleOrder} disabled={!selectedMenuData}>
            {selectedMenuData
              ? `${formatPrice(finalPrice)} 주문하기`
              : "메뉴를 선택해주세요"}
          </OrderButton>
        </ContentWrapper>
      </Main>
    </Container>
  );
}
