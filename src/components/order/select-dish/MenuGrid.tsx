"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { MenuItem } from "@/data/menus";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MenuCard = styled.div<{ selected: boolean }>`
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

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
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const MenuInfo = styled.div<{ selected: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "transparent"};
`;

const MenuName = styled.h3<{ selected: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MenuDescription = styled.p<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MenuItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ItemTag = styled.span<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.accent};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.buttonBackground};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

interface MenuGridProps {
  menus: MenuItem[];
  selectedMenuId: number | null;
  onSelectMenu: (menuId: number) => void;
}

export default function MenuGrid({
  menus,
  selectedMenuId,
  onSelectMenu,
}: MenuGridProps) {
  return (
    <Grid>
      {menus.map((menu) => {
        const isSelected = selectedMenuId === menu.id;
        return (
          <MenuCard
            key={menu.id}
            selected={isSelected}
            onClick={() => onSelectMenu(menu.id)}
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
            <MenuInfo selected={isSelected}>
              <MenuName selected={isSelected}>{menu.name}</MenuName>
              <MenuDescription selected={isSelected}>
                {menu.description}
              </MenuDescription>
              <MenuItems>
                {menu.items.map((item, index) => (
                  <ItemTag key={index} selected={isSelected}>
                    {item}
                  </ItemTag>
                ))}
              </MenuItems>
            </MenuInfo>
          </MenuCard>
        );
      })}
    </Grid>
  );
}
