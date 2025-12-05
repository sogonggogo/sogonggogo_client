"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dinnerMenus } from "@/constants/menus";
import { ServingStyleType } from "@/types/domain/style";
import { ShoppingCart } from "lucide-react";
import MenuGrid from "@/components/order/select-dish/MenuGrid";
import StyleSelector from "@/components/order/select-dish/StyleSelector";
import OrderButton from "@/components/order/select-dish/OrderButton";
import { addOrder } from "@/storage/order";
import { getItemsForMenu } from "@/utils/menu";

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
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] =
    useState<ServingStyleType>("simple");

  const selectedMenuData =
    selectedMenu !== null
      ? dinnerMenus.find((m) => m.id === selectedMenu)
      : null;

  const handleGoToOptions = () => {
    if (!selectedMenuData || !selectedMenu) {
      return;
    }
    const menuItems = getItemsForMenu(selectedMenu);
    const initialItems = menuItems.map((item) => ({
      name: item.name,
      quantity: item.defaultQuantity || 1,
    }));

    addOrder(selectedMenu, selectedStyle, initialItems);
    router.push("/change-option");
  };

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <ShoppingCart size={48} strokeWidth={2} />
            일반주문
          </PageTitle>

          <SectionTitle>메뉴 선택</SectionTitle>
          <MenuGrid
            menus={dinnerMenus}
            selectedMenuId={selectedMenu}
            onSelectMenu={setSelectedMenu}
          />

          {selectedMenuData && (
            <StyleSelector
              selectedMenu={selectedMenuData}
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
            />
          )}

          <OrderButton onClick={handleGoToOptions} disabled={!selectedMenuData}>
            {selectedMenuData ? `옵션 선택하기` : "메뉴를 선택해주세요"}
          </OrderButton>
        </ContentWrapper>
      </Main>
    </Container>
  );
}
