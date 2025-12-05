import type { ServingStyleType } from "@/types/domain/style";
import { servingStyles } from "@/constants/styles";

/**
 * 스타일에 따른 가격 계산
 */
export const calculatePriceWithStyle = (
  basePrice: number,
  styleType: ServingStyleType
): number => {
  const style = servingStyles[styleType];
  if (!style) {
    return basePrice; // 스타일을 찾을 수 없으면 기본 가격만 반환
  }
  return basePrice + style.additionalPrice;
};

