"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { dinnerMenus } from "@/data/menus";

// 애니메이션 정의
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  background: ${({ theme }) => theme.colors.gradientOrange};
  animation: ${fadeIn} 0.6s ease-out;
`;

const ContentWrapper = styled.div`
  max-width: 50%;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.spacing.xxl};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.base + 10};
  position: relative;
  animation: ${fadeInLeft} 0.6s ease-out;
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
  position: absolute;
  right: ${({ theme }) => theme.spacing.xxl};
  top: 50%;
  margin-top: -266px; /* height / 2 for centering */
  width: 342px;
  height: 532px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.base + 5};
  animation: ${fadeInLeft} 0.6s ease-out;
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
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteAlpha80};
  }
`;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dinnerMenus.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + dinnerMenus.length) % dinnerMenus.length
    );
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // 자동 슬라이드 효과
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dinnerMenus.length);
    }, 3000); // 3초마다 자동 전환

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentMenu = dinnerMenus[currentSlide];

  return (
    <HeroContainer>
      {/* Gradient Background */}
      <GradientBackground />

      {/* Background Image Layer */}
      <ImageContainer key={`image-${currentSlide}`}>
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

      {/* Content Layer */}
      <ContentWrapper>
        <TextContent key={`text-${currentSlide}`}>
          <Title>{currentMenu.nameEn}</Title>
          <Subtitle>{currentMenu.name}</Subtitle>
          <Description>{currentMenu.description}</Description>
          <MenuItems>
            {currentMenu.items.map((item, index) => (
              <ItemTag key={index}>{item}</ItemTag>
            ))}
          </MenuItems>
        </TextContent>
      </ContentWrapper>

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
        <ControlButton onClick={togglePlayPause}>
          {isPlaying ? (
            <Pause size={20} color="#D62300" strokeWidth={2} />
          ) : (
            <Play size={20} color="#D62300" strokeWidth={2} />
          )}
        </ControlButton>

        {/* Next Button */}
        <ControlButton onClick={nextSlide}>
          <ChevronRight size={24} color="#D62300" strokeWidth={2} />
        </ControlButton>
      </ControlsContainer>
    </HeroContainer>
  );
}
