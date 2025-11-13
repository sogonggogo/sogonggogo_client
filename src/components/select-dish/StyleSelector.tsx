"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import {
  servingStyles,
  calculatePriceWithStyle,
  ServingStyleType,
} from "@/data/styles";
import { formatPrice, MenuItem } from "@/data/menus";

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
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StyleCard = styled.button<{ selected: boolean; disabled: boolean }>`
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transition.fast};
  text-align: left;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const StyleImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 290px;
  background: ${({ theme }) => theme.colors.gradientOrange};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const StyleInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const StyleName = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StylePrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const StyleFeatures = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  opacity: 0.7;
  line-height: 1.4;
`;

interface StyleSelectorProps {
  selectedMenu: MenuItem;
  selectedStyle: ServingStyleType;
  onSelectStyle: (styleType: ServingStyleType) => void;
}

export default function StyleSelector({
  selectedMenu,
  selectedStyle,
  onSelectStyle,
}: StyleSelectorProps) {
  return (
    <StyleSection>
      <SectionTitle>서빙 스타일 선택</SectionTitle>
      <StyleGrid>
        {(Object.keys(servingStyles) as ServingStyleType[]).map((styleType) => {
          const style = servingStyles[styleType];
          const isAvailable = selectedMenu.availableStyles.includes(styleType);
          const price = calculatePriceWithStyle(
            selectedMenu.basePrice,
            styleType
          );

          return (
            <StyleCard
              key={styleType}
              selected={selectedStyle === styleType}
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectStyle(styleType)}
            >
              <StyleImageWrapper>
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </StyleImageWrapper>
              <StyleInfo>
                <StyleName>{style.name}</StyleName>
                <StylePrice>{formatPrice(price)}</StylePrice>
                <StyleFeatures>
                  <div>{style.features.plate}</div>
                  <div>{style.features.napkin}</div>
                  <div>{style.features.wineGlass}</div>
                  {style.features.extras &&
                    style.features.extras.map((extra, i) => (
                      <div key={i}>{extra}</div>
                    ))}
                </StyleFeatures>
              </StyleInfo>
            </StyleCard>
          );
        })}
      </StyleGrid>
    </StyleSection>
  );
}
