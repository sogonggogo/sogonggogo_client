'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 824px;
  height: 545px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  background: linear-gradient(180deg, #ffa500 0%, #ff8c00 100%);
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
`;

const Title = styled.h2`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 60px;
  font-weight: 900;
  line-height: 1em;
  color: white;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: white;
  margin: 0;
`;

const Description = styled.p`
  font-size: 20px;
  color: white;
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
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 25px 50px 0px rgba(0, 0, 0, 0.15);
  font-size: 48px;
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 20;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: white;
  }
`;

const IndicatorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IndicatorButton = styled.button<{ isActive: boolean }>`
  height: 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  width: ${({ isActive }) => (isActive ? '48px' : '12px')};
  background-color: ${({ isActive }) =>
    isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
`;

const slides = [
  {
    id: 1,
    title: 'MAXIMUM',
    subtitle: '맥시멈 버거',
    description: '더 크게, 더 맛있게!',
    image: '/burger-1.png'
  },
  {
    id: 2,
    title: 'WHOPPER',
    subtitle: '와퍼 주니어',
    description: '클래식의 정석!',
    image: '/burger-2.png'
  },
  {
    id: 3,
    title: 'COMBO',
    subtitle: '콤보 세트',
    description: '더 푸짐하게!',
    image: '/burger-3.png'
  }
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
