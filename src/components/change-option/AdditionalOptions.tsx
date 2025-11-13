"use client";

import styled from "@emotion/styled";
import { formatPrice } from "@/data/menus";

const OptionsCard = styled.div`
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

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OptionItem = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.accent};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const OptionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 2px solid
    ${({ checked, theme }) =>
      checked ? theme.colors.white : theme.colors.accent};
  background: ${({ checked, theme }) =>
    checked ? theme.colors.white : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};

  &::after {
    content: "✓";
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    opacity: ${({ checked }) => (checked ? 1 : 0)};
  }
`;

const OptionName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const OptionPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export interface AdditionalOption {
  id: string;
  name: string;
  price: number;
}

interface AdditionalOptionsProps {
  options: AdditionalOption[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
}

export default function AdditionalOptions({
  options,
  selectedOptions,
  onToggleOption,
}: AdditionalOptionsProps) {
  return (
    <OptionsCard>
      <SectionTitle>추가 옵션</SectionTitle>
      <OptionsList>
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <OptionItem key={option.id} selected={isSelected}>
              <OptionInfo>
                <HiddenCheckbox
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleOption(option.id)}
                />
                <CustomCheckbox checked={isSelected} />
                <OptionName>{option.name}</OptionName>
              </OptionInfo>
              <OptionPrice>+ {formatPrice(option.price)}</OptionPrice>
            </OptionItem>
          );
        })}
      </OptionsList>
    </OptionsCard>
  );
}

