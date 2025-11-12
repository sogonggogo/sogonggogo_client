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
    description: "작은 하트 모양과 큐피드가 장식된 접시에 냅킨과 함께",
    items: ["와인", "스테이크", "하트 장식", "큐피드 장식"],
    basePrice: 89000,
    servings: 2,
    availableStyles: ["simple", "grand", "deluxe"],
    image: "/images/valentine.png",
  },
  {
    id: 2,
    name: "프렌치 디너",
    nameEn: "FRENCH DINNER",
    description: "프랑스의 정통 코스 요리를 경험하세요",
    items: ["커피", "와인", "샐러드", "스테이크"],
    basePrice: 65000,
    servings: 1,
    availableStyles: ["simple", "grand", "deluxe"],
    image: "/images/french.png",
  },
  {
    id: 3,
    name: "잉글리시 디너",
    nameEn: "ENGLISH DINNER",
    description: "영국식 아침 식사로 하루를 시작하세요",
    items: ["에그 스크램블", "베이컨", "빵", "스테이크"],
    basePrice: 55000,
    servings: 1,
    availableStyles: ["simple", "grand", "deluxe"],
    image: "/images/english.png",
  },
  {
    id: 4,
    name: "샴페인 축제 디너",
    nameEn: "CHAMPAGNE FEAST",
    description: "축제를 위한 특별한 2인 디너",
    items: [
      "샴페인 1병",
      "바게트 빵 4개",
      "커피 1포트",
      "와인",
      "스테이크",
    ],
    basePrice: 120000,
    servings: 2,
    availableStyles: ["grand", "deluxe"], // 샴페인 축제는 grand와 deluxe만 가능
    image: "/images/champagne.png",
  },
];

export const getDinnerById = (id: number): MenuItem | undefined => {
  return dinnerMenus.find((menu) => menu.id === id);
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ko-KR")}원`;
};

