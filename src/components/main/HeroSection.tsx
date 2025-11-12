"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause } from "lucide-react";
import { dinnerMenus } from "@/data/menus";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.sizes.heroHeight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.gradientOrange};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.base + 9};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  line-height: 1em;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  margin: 0;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.whiteAlpha80};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  margin: 0;
`;

const MenuItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ItemTag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.whiteAlpha25};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 364px;
  height: 546px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const ControlButton = styled.button`
  width: ${({ theme }) => theme.sizes.controlButton};
  height: ${({ theme }) => theme.sizes.controlButton};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.whiteAlpha80};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const IndicatorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IndicatorButton = styled.button<{ isActive: boolean }>`
  height: ${({ theme }) => theme.sizes.indicatorSmall};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  width: ${({ isActive, theme }) =>
    isActive ? theme.sizes.indicatorLarge : theme.sizes.indicatorSmall};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.whiteAlpha50};
`;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dinnerMenus.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + dinnerMenus.length) % dinnerMenus.length
    );
  };

  const currentMenu = dinnerMenus[currentSlide];

  return (
    <HeroContainer>
      {/* Gradient Background */}
      <GradientBackground>
        {/* Text Content */}
        <TextContent>
          <Title>{currentMenu.nameEn}</Title>
          <Subtitle>{currentMenu.name}</Subtitle>
          <Description>{currentMenu.description}</Description>
          <MenuItems>
            {currentMenu.items.map((item, index) => (
              <ItemTag key={index}>{item}</ItemTag>
            ))}
          </MenuItems>
        </TextContent>

        {/* Menu Image */}
        <ImageContainer>
          {currentMenu.image && (
            <StyledImage
              src={currentMenu.image}
              alt={currentMenu.name}
              width={364}
              height={546}
              priority
            />
          )}
        </ImageContainer>
      </GradientBackground>

      {/* Controls */}
      <ControlsContainer>
        {/* Previous Button */}
        <ControlButton onClick={prevSlide}>
          <ChevronLeft size={24} color="#D62300" strokeWidth={2} />
        </ControlButton>

        {/* Slide Indicators */}
        <IndicatorsContainer>
          {dinnerMenus.map((_, index) => (
            <IndicatorButton
              key={index}
              isActive={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </IndicatorsContainer>

        {/* Play/Pause Button */}
        <ControlButton>
          <Pause size={20} color="#D62300" strokeWidth={2} />
        </ControlButton>

        {/* Next Button */}
        <ControlButton onClick={nextSlide}>
          <ChevronRight size={24} color="#D62300" strokeWidth={2} />
        </ControlButton>
      </ControlsContainer>
    </HeroContainer>
  );
}
