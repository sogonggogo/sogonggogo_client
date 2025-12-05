import type { ServingStyle, ServingStyleType } from "@/types/domain/style";

export const servingStyles: Record<ServingStyleType, ServingStyle> = {
  simple: {
    name: "심플 스타일",
    nameEn: "SIMPLE STYLE",
    description: "편안하고 실용적인 서빙",
    features: {
      plate: "플라스틱 접시",
      napkin: "종이 냅킨",
      wineGlass: "플라스틱 잔",
    },
    additionalPrice: 0,
    image: "/images/style/simple.png",
  },
  grand: {
    name: "그랜드 스타일",
    nameEn: "GRAND STYLE",
    description: "품격 있는 정통 서빙",
    features: {
      plate: "도자기 접시",
      napkin: "흰색 면 냅킨",
      wineGlass: "플라스틱 잔",
    },
    additionalPrice: 20000,
    image: "/images/style/grand.png",
  },
  deluxe: {
    name: "디럭스 스타일",
    nameEn: "DELUXE STYLE",
    description: "최상급 프리미엄 서빙",
    features: {
      plate: "도자기 접시",
      napkin: "린넨 냅킨",
      wineGlass: "유리 잔",
      extras: ["작은 꽃병과 꽃"],
    },
    additionalPrice: 50000,
    image: "/images/style/deluxe.png",
  },
};

