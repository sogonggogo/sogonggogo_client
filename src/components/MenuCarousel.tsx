"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

export function MenuCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout>();

  // 애니메이션 텍스트를 위한 상태
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["남편", "아내", "엄마", "아버지", "친구"];
  const textIntervalRef = useRef<NodeJS.Timeout>();

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
    <section className="w-full py-8">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            특별한 날에 집에서 편안히 보내면서
          </h2>
          <p className="text-lg text-gray-600 flex items-center justify-center gap-1">
            <span>당신의</span>
            <span className="relative inline-block min-w-[4rem] h-7 overflow-hidden">
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
                  className="absolute left-1/2 top-0 -translate-x-1/2 text-orange-600 font-bold whitespace-nowrap"
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
          className="w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent className="-ml-4">
            {menuData.map((menu) => (
              <CarouselItem
                key={menu.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={menu.imageUrl}
                      alt={menu.name}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{menu.name}</h3>
                      <p className="text-sm opacity-90 mb-2">
                        {menu.englishName}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {menu.description}
                    </p>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-orange-600">
                        {menu.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* 큰 주문 버튼들 */}
        <div className="flex gap-4 justify-center mt-8">
          <button className="px-12 py-4 bg-orange-600 text-white rounded-xl text-xl font-bold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
            🍽️ 주문하기
          </button>
          <button className="px-12 py-4 bg-orange-600 text-white rounded-xl text-xl font-bold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
            📋 주문목록
          </button>
        </div>
      </div>
    </section>
  );
}
