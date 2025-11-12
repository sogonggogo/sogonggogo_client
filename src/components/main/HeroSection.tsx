"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight, Pause } from "lucide-react";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.sizes.heroHeight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
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
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  margin: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 364px;
  height: 546px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.hero};
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

const slides = [
  {
    id: 1,
    title: "MAXIMUM",
    subtitle: "맥시멈 버거",
    description: "더 크게, 더 맛있게!",
    image: "/burger-1.png",
  },
  {
    id: 2,
    title: "WHOPPER",
    subtitle: "와퍼 주니어",
    description: "클래식의 정석!",
    image: "/burger-2.png",
  },
  {
    id: 3,
    title: "COMBO",
    subtitle: "콤보 세트",
    description: "더 푸짐하게!",
    image: "/burger-3.png",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentItem = slides[currentSlide];

  return (
    <HeroContainer>
      {/* Gradient Background */}
      <GradientBackground>
        {/* Text Content */}
        <TextContent>
          <Title>{currentItem.title}</Title>
          <Subtitle>{currentItem.subtitle}</Subtitle>
          <Description>{currentItem.description}</Description>
        </TextContent>

        {/* Burger Image */}
        <ImageContainer>
          <ImagePlaceholder>
            <span>🍔</span>
          </ImagePlaceholder>
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
          {slides.map((_, index) => (
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
