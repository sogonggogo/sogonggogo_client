/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { Header } from "@/components/Header";
import { MenuCarousel } from "@/components/MenuCarousel";
import { OrderHistory } from "@/components/OrderHistory";
import { MainButtons } from "@/components/MainButtons";

const pageStyles = css`
  min-height: 100vh;
  background-color: #ffffff;
`;

const mainStyles = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  max-width: 80rem;
  margin: 0 auto;
`;

const topSectionStyles = css`
  display: flex;
  gap: 2rem;
`;

const carouselContainerStyles = css`
  flex: 1;
`;

const orderHistoryContainerStyles = css`
  width: 24rem;
  flex-shrink: 0;
`;

const buttonsContainerStyles = css`
  display: flex;
  justify-content: center;
`;

export default function MainPage() {
  return (
    <div css={pageStyles}>
      <Header />
      <main css={mainStyles}>
        {/* 상단: MenuCarousel과 OrderHistory를 가로로 배치 */}
        <div css={topSectionStyles}>
          <div css={carouselContainerStyles}>
            <MenuCarousel />
          </div>
          <div css={orderHistoryContainerStyles}>
            <OrderHistory />
          </div>
        </div>

        {/* 하단: MainButtons를 중앙에 배치 */}
        <div css={buttonsContainerStyles}>
          <MainButtons />
        </div>
      </main>
    </div>
  );
}
