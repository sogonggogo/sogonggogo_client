/** @jsxImportSource @emotion/react */
'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';

const heroContainerStyles = css`
  position: relative;
  width: 100%;
  max-width: 824px;
  height: 545px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const gradientBackgroundStyles = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  background: linear-gradient(180deg, #FFA500 0%, #FF8C00 100%);
`;

const textContentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
`;

const titleStyles = css`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 60px;
  font-weight: 900;
  line-height: 1em;
  color: white;
  margin: 0;
`;

const subtitleStyles = css`
  font-size: 24px;
  color: white;
  margin: 0;
`;

const descriptionStyles = css`
  font-size: 20px;
  color: white;
  margin: 0;
`;

const imageContainerStyles = css`
  position: relative;
  width: 364px;
  height: 546px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const imagePlaceholderStyles = css`
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

const controlsContainerStyles = css`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 20;
`;

const controlButtonStyles = css`
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

const indicatorsContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const indicatorButtonStyles = (isActive: boolean) => css`
  height: 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  width: ${isActive ? '48px' : '12px'};
  background-color: ${isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
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
    <div css={heroContainerStyles}>
      {/* Gradient Background */}
      <div css={gradientBackgroundStyles}>
        {/* Text Content */}
        <div css={textContentStyles}>
          <h2 css={titleStyles}>{currentItem.title}</h2>
          <p css={subtitleStyles}>{currentItem.subtitle}</p>
          <p css={descriptionStyles}>{currentItem.description}</p>
        </div>

        {/* Burger Image */}
        <div css={imageContainerStyles}>
          <div css={imagePlaceholderStyles}>
            <span>🍔</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div css={controlsContainerStyles}>
        {/* Previous Button */}
        <button css={controlButtonStyles} onClick={prevSlide}>
          <ChevronLeft size={24} color="#D62300" strokeWidth={2} />
        </button>

        {/* Slide Indicators */}
        <div css={indicatorsContainerStyles}>
          {slides.map((_, index) => (
            <button
              key={index}
              css={indicatorButtonStyles(index === currentSlide)}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button css={controlButtonStyles}>
          <Pause size={20} color="#D62300" strokeWidth={2} />
        </button>

        {/* Next Button */}
        <button css={controlButtonStyles} onClick={nextSlide}>
          <ChevronRight size={24} color="#D62300" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
