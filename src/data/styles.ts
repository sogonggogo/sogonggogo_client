export type ServingStyleType = "simple" | "grand" | "deluxe";

export interface ServingStyle {
  type: ServingStyleType;
  name: string;
  nameEn: string;
  description: string;
  features: {
    plate: string;
    cup: string;
    napkin: string;
    tray: string;
    wineGlass: string;
    extras?: string[];
  };
  priceMultiplier: number; // 기본 가격에 곱해지는 배율
  image: string; // 스타일 이미지 경로
}

export const servingStyles: Record<ServingStyleType, ServingStyle> = {
  simple: {
    type: "simple",
    name: "심플 스타일",
    nameEn: "SIMPLE STYLE",
    description: "편안하고 실용적인 서빙",
    features: {
      plate: "플라스틱 접시",
      cup: "플라스틱 컵",
      napkin: "종이 냅킨",
      tray: "플라스틱 쟁반",
      wineGlass: "플라스틱 잔",
    },
    priceMultiplier: 1.0,
    image: "/images/style/simple.png",
  },
  grand: {
    type: "grand",
    name: "그랜드 스타일",
    nameEn: "GRAND STYLE",
    description: "품격 있는 정통 서빙",
    features: {
      plate: "도자기 접시",
      cup: "도자기 컵",
      napkin: "흰색 면 냅킨",
      tray: "나무 쟁반",
      wineGlass: "플라스틱 잔",
    },
    priceMultiplier: 1.3,
    image: "/images/style/grand.png",
  },
  deluxe: {
    type: "deluxe",
    name: "디럭스 스타일",
    nameEn: "DELUXE STYLE",
    description: "최상급 프리미엄 서빙",
    features: {
      plate: "도자기 접시",
      cup: "도자기 컵",
      napkin: "린넨 냅킨",
      tray: "나무 쟁반",
      wineGlass: "유리 잔",
      extras: ["작은 꽃병과 꽃"],
    },
    priceMultiplier: 1.6,
    image: "/images/style/deluxe.png",
  },
};

export const getStyleByType = (
  type: ServingStyleType
): ServingStyle | undefined => {
  return servingStyles[type];
};

export const calculatePriceWithStyle = (
  basePrice: number,
  styleType: ServingStyleType
): number => {
  const style = servingStyles[styleType];
  return Math.round(basePrice * style.priceMultiplier);
};

export const getAvailableStyles = (
  menuId: number
): ServingStyleType[] => {
  // 샴페인 축제 디너(id: 4)는 grand와 deluxe만 가능
  if (menuId === 4) {
    return ["grand", "deluxe"];
  }
  // 다른 메뉴는 모든 스타일 가능
  return ["simple", "grand", "deluxe"];
};

export const isStyleAvailable = (
  menuId: number,
  styleType: ServingStyleType
): boolean => {
  const availableStyles = getAvailableStyles(menuId);
  return availableStyles.includes(styleType);
};

