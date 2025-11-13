"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { dinnerMenus, formatPrice } from "@/data/menus";
import { servingStyles, calculatePriceWithStyle, ServingStyleType } from "@/data/styles";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

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

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MenuCard = styled.div<{ selected: boolean }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  border: 3px solid ${({ selected, theme }) => 
    selected ? theme.colors.primary : "transparent"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const MenuImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.colors.gradientOrange};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const MenuName = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MenuDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MenuItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ItemTag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.buttonBackground};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const MenuPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const StyleSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const StyleCard = styled.button<{ selected: boolean; disabled: boolean }>`
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transition.fast};
  text-align: left;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const StyleName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StylePrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyleFeatures = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  opacity: 0.8;
`;

const OrderButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function OrderPage() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ServingStyleType>("simple");

  const selectedMenuData = selectedMenu !== null ? dinnerMenus.find(m => m.id === selectedMenu) : null;
  const finalPrice = selectedMenuData 
    ? calculatePriceWithStyle(selectedMenuData.basePrice, selectedStyle)
    : 0;

  const handleOrder = () => {
    if (!selectedMenuData) {
      alert("메뉴를 선택해주세요!");
      return;
    }
    alert(`주문이 완료되었습니다!\n${selectedMenuData.name} (${servingStyles[selectedStyle].name})\n${formatPrice(finalPrice)}`);
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
          <MenuGrid>
            {dinnerMenus.map((menu) => (
              <MenuCard
                key={menu.id}
                selected={selectedMenu === menu.id}
                onClick={() => setSelectedMenu(menu.id)}
              >
                <MenuImage>
                  {menu.image && (
                    <Image
                      src={menu.image}
                      alt={menu.name}
                      width={300}
                      height={300}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </MenuImage>
                <MenuInfo>
                  <MenuName>{menu.name}</MenuName>
                  <MenuDescription>{menu.description}</MenuDescription>
                  <MenuItems>
                    {menu.items.map((item, index) => (
                      <ItemTag key={index}>{item}</ItemTag>
                    ))}
                  </MenuItems>
                  <MenuPrice>{formatPrice(menu.basePrice)} ~</MenuPrice>
                </MenuInfo>
              </MenuCard>
            ))}
          </MenuGrid>

          {/* 서빙 스타일 선택 */}
          {selectedMenuData && (
            <StyleSection>
              <SectionTitle>서빙 스타일 선택</SectionTitle>
              <StyleGrid>
                {(Object.keys(servingStyles) as ServingStyleType[]).map((styleType) => {
                  const style = servingStyles[styleType];
                  const isAvailable = selectedMenuData.availableStyles.includes(styleType);
                  const price = calculatePriceWithStyle(selectedMenuData.basePrice, styleType);

                  return (
                    <StyleCard
                      key={styleType}
                      selected={selectedStyle === styleType}
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedStyle(styleType)}
                    >
                      <StyleName>{style.name}</StyleName>
                      <StylePrice>{formatPrice(price)}</StylePrice>
                      <StyleFeatures>
                        <div>{style.features.plate}</div>
                        <div>{style.features.napkin}</div>
                        <div>{style.features.wineGlass}</div>
                        {style.features.extras && style.features.extras.map((extra, i) => (
                          <div key={i}>{extra}</div>
                        ))}
                      </StyleFeatures>
                    </StyleCard>
                  );
                })}
              </StyleGrid>
            </StyleSection>
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

