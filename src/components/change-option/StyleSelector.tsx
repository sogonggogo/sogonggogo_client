"use client";

import styled from "@emotion/styled";
import { servingStyles, ServingStyleType } from "@/data/styles";
import { formatPrice } from "@/data/menus";

const StyleSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyleOptions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyleButton = styled.button<{ selected: boolean; disabled: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primary : theme.colors.border};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.white};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transition.fast};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

const StyleName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StylePrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

interface StyleSelectorProps {
  currentStyle: ServingStyleType;
  availableStyles: ServingStyleType[];
  basePrice: number;
  onSelectStyle: (style: ServingStyleType) => void;
}

export default function StyleSelector({
  currentStyle,
  availableStyles,
  basePrice,
  onSelectStyle,
}: StyleSelectorProps) {
  return (
    <StyleSection>
      <SectionTitle>서빙 스타일</SectionTitle>
      <StyleOptions>
        {(["simple", "grand", "deluxe"] as ServingStyleType[]).map(
          (styleType) => {
            const style = servingStyles[styleType];
            const isAvailable = availableStyles.includes(styleType);

            return (
              <StyleButton
                key={styleType}
                selected={currentStyle === styleType}
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelectStyle(styleType)}
              >
                <StyleName>{style.name}</StyleName>
                <StylePrice>
                  {style.additionalPrice === 0
                    ? "기본"
                    : `+${formatPrice(style.additionalPrice)}`}
                </StylePrice>
              </StyleButton>
            );
          }
        )}
      </StyleOptions>
    </StyleSection>
  );
}

