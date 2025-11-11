/** @jsxImportSource @emotion/react */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

interface MenuData {
  id: number;
  name: string;
  englishName: string;
  description: string;
  price: string;
  imageUrl: string;
}

const menuData: MenuData[] = [
  {
    id: 1,
    name: "발렌타인 디너",
    englishName: "Valentine Dinner",
    description:
      "작은 하트 모양과 큐피드가 장식된 접시에 냅킨과 함께 와인과 스테이크가 제공",
    price: "85,000원",
    imageUrl:
      "https://images.unsplash.com/photo-1691079753828-c922446191a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMHdpbmUlMjBzdGVhayUyMHZhbGVudGluZXxlbnwxfHx8fDE3NTc5MzQyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "프렌치 디너",
    englishName: "French Dinner",
    description: "커피 한잔, 와인 한잔, 샐러드, 스테이크 제공",
    price: "75,000원",
    imageUrl:
      "https://images.unsplash.com/photo-1598930230437-6448293d03d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBjdWlzaW5lJTIwc3RlYWslMjB3aW5lfGVufDF8fHx8MTc1NzkzNDI3MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "잉글리시 디너",
    englishName: "English Dinner",
    description: "에그 스크램블, 베이컨, 빵, 스테이크가 제공",
    price: "65,000원",
    imageUrl:
      "https://images.unsplash.com/photo-1591745952765-071aa8677b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwYnJlYWtmYXN0JTIwc3RlYWslMjBiYWNvbnxlbnwxfHx8fDE3NTc5MzQyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "샴페인 축제 디너",
    englishName: "Champagne Feast Dinner",
    description: "샴페인 1병, 4개의 바게트빵, 커피 포트, 와인, 스테이크 제공",
    price: "120,000원",
    imageUrl:
      "https://images.unsplash.com/photo-1711425132206-27ff8aa795a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmUlMjBkaW5uZXIlMjBmZWFzdCUyMHN0ZWFrfGVufDF8fHx8MTc1NzkzNDI3MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const sectionStyles = css`
  width: 100%;
  padding: 2rem 0;
`;

const containerStyles = css`
  width: 100%;
`;

const headerContainerStyles = css`
  text-align: center;
  margin-bottom: 3rem;
`;

const titleStyles = css`
  font-size: 1.875rem;
  font-weight: 700;
  color: #171717;
  margin-bottom: 1rem;
`;

const subtitleStyles = css`
  font-size: 1.125rem;
  color: #525252;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const animatedWordContainerStyles = css`
  position: relative;
  display: inline-block;
  min-width: 4rem;
  height: 1.75rem;
  overflow: hidden;
`;

const animatedWordStyles = css`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  color: #ea580c;
  font-weight: 700;
  white-space: nowrap;
`;

const carouselWrapperStyles = css`
  width: 100%;
`;

const carouselContentStyles = css`
  margin-left: -1rem;
`;

const carouselItemStyles = css`
  padding-left: 1rem;
  
  @media (min-width: 768px) {
    flex-basis: 50%;
  }
  
  @media (min-width: 1024px) {
    flex-basis: 33.333333%;
  }
`;

const cardStyles = css`
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 0;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const imageContainerStyles = css`
  position: relative;
  height: 16rem;
`;

const imageStyles = css`
  width: 100%;
  height: 100%;
`;

const overlayStyles = css`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
`;

const imageTextStyles = css`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  color: #ffffff;
`;

const menuNameStyles = css`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const menuEnglishNameStyles = css`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const cardContentStyles = css`
  padding: 1.5rem;
  padding-top: 0;
`;

const descriptionStyles = css`
  color: #525252;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const priceContainerStyles = css`
  text-align: center;
`;

const priceStyles = css`
  font-size: 1.875rem;
  font-weight: 700;
  color: #ea580c;
`;

export function MenuCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 애니메이션 텍스트를 위한 상태
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["남편", "아내", "엄마", "아버지", "친구"];
  const textIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    // 5초마다 자동으로 다음 슬라이드로 이동
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        // 마지막 슬라이드에서 첫 번째 슬라이드로 순환
        if (!api.canScrollNext()) {
          api.scrollTo(0);
        } else {
          api.scrollNext();
        }
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api]);

  // 텍스트 애니메이션을 위한 useEffect
  useEffect(() => {
    const startTextAnimation = () => {
      textIntervalRef.current = setInterval(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 2000); // 2초 간격
    };

    startTextAnimation();

    return () => {
      if (textIntervalRef.current) {
        clearInterval(textIntervalRef.current);
      }
    };
  }, [words.length]);

  // 마우스 오버 시 자동 슬라이드 정지, 마우스 아웃 시 재시작
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!api) return;
    intervalRef.current = setInterval(() => {
      if (!api.canScrollNext()) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 5000);
  };

  return (
    <section css={sectionStyles}>
      <div css={containerStyles}>
        <div css={headerContainerStyles}>
          <h2 css={titleStyles}>
            특별한 날에 집에서 편안히 보내면서
          </h2>
          <p css={subtitleStyles}>
            <span>당신의</span>
            <span css={animatedWordContainerStyles}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[currentWordIndex]}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  css={animatedWordStyles}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>를 감동시켜라</span>
          </p>
        </div>

        <Carousel
          setApi={setApi}
          customCss={carouselWrapperStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent customCss={carouselContentStyles}>
            {menuData.map((menu) => (
              <CarouselItem
                key={menu.id}
                customCss={carouselItemStyles}
              >
                <Card customCss={cardStyles}>
                  <div css={imageContainerStyles}>
                    <ImageWithFallback
                      src={menu.imageUrl}
                      alt={menu.name}
                      customCss={imageStyles}
                    />
                    <div css={overlayStyles} />
                    <div css={imageTextStyles}>
                      <h3 css={menuNameStyles}>{menu.name}</h3>
                      <p css={menuEnglishNameStyles}>
                        {menu.englishName}
                      </p>
                    </div>
                  </div>
                  <CardContent customCss={cardContentStyles}>
                    <p css={descriptionStyles}>
                      {menu.description}
                    </p>
                    <div css={priceContainerStyles}>
                      <span css={priceStyles}>
                        {menu.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
