/**
 * 가격 포맷팅
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ko-KR")}원`;
};

