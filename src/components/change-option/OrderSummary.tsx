"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { MenuItem, formatPrice } from "@/data/menus";
import { ServingStyle } from "@/data/styles";

const SummaryCard = styled.div`
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

const SummaryContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradientOrange};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  flex: 1;
`;

const MenuName = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MenuDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyleInfo = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
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

const PriceInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

interface OrderSummaryProps {
  menu: MenuItem;
  style: ServingStyle;
  price: number;
}

export default function OrderSummary({ menu, style, price }: OrderSummaryProps) {
  return (
    <SummaryCard>
      <SectionTitle>주문 요약</SectionTitle>
      <SummaryContent>
        <ImageWrapper>
          {menu.image && (
            <Image
              src={menu.image}
              alt={menu.name}
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          )}
        </ImageWrapper>
        <InfoWrapper>
          <MenuName>{menu.name}</MenuName>
          <MenuDescription>{menu.description}</MenuDescription>
          <StyleInfo>{style.name}</StyleInfo>
          <MenuItems>
            {menu.items.map((item, index) => (
              <ItemTag key={index}>{item}</ItemTag>
            ))}
          </MenuItems>
          <PriceInfo>기본 가격: {formatPrice(price)}</PriceInfo>
        </InfoWrapper>
      </SummaryContent>
    </SummaryCard>
  );
}

