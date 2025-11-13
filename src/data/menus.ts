import { ServingStyleType } from "./styles";

export interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  items: string[];
  basePrice: number; // 기본 가격 (simple 스타일 기준)
  servings: number;
  availableStyles: ServingStyleType[]; // 가능한 서빙 스타일
  image?: string;
}

export const dinnerMenus: MenuItem[] = [
  {
    id: 1,
    name: "발렌타인 디너",
    nameEn: "VALENTINE DINNER",
    description: "로멘틱한 분위기를 위한 디너",
    items: ["와인", "스테이크", "하트 장식", "큐피드 장식"],
    basePrice: 89000,
    servings: 2,
    availableStyles: ["simple", "grand", "deluxe"],
    image: "/images/menu/valentine.png",
  },
  {
    id: 2,
    name: "프렌치 디너",
    nameEn: "FRENCH DINNER",
    description: "프랑스의 레스토랑 코스 디너",
    items: ["커피", "와인", "샐러드", "스테이크"],
    basePrice: 65000,
    servings: 1,
    availableStyles: ["simple", "grand", "deluxe"],
    image: "/images/menu/french.png",
  },
  {
    id: 3,
    name: "잉글리시 디너",
    nameEn: "ENGLISH DINNER",
    description: "영국의 정통 코스 디너",
    items: ["에그 스크램블", "베이컨", "빵", "스테이크"],
    basePrice: 55000,
    servings: 1,
    availableStyles: ["simple", "grand", "deluxe"],
    image: "/images/menu/english.png",
  },
  {
    id: 4,
    name: "샴페인 축제 디너",
    nameEn: "CHAMPAGNE FEAST",
    description: "축제를 위한 특별한 2인 디너",
    items: ["샴페인", "바게트 빵", "커피", "와인", "스테이크"],
    basePrice: 120000,
    servings: 2,
    availableStyles: ["grand", "deluxe"], // 샴페인 축제는 grand와 deluxe만 가능
    image: "/images/menu/champagne.png",
  },
];

export const getDinnerById = (id: number): MenuItem | undefined => {
  return dinnerMenus.find((menu) => menu.id === id);
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ko-KR")}원`;
};
