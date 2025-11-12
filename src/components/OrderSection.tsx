/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { ShoppingCart, Mic, Clock } from 'lucide-react';

const sectionStyles = css`
  width: 100%;
`;

const headerStyles = css`
  margin-bottom: 32px;
`;

const titleStyles = css`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: #D62300;
  margin: 0;
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const cardButtonStyles = css`
  position: relative;
  height: 225px;
  border-radius: 26px;
  background-color: #D9D9D9;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    background-color: #C9C9C9;
  }
`;

const cardContentStyles = css`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
`;

const iconWrapperStyles = css`
  transition: transform 0.3s;

  ${cardButtonStyles}:hover & {
    transform: scale(1.1);
  }
`;

const cardTitleStyles = css`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: #D62300;
  margin: 0;
`;

const cardDescriptionStyles = css`
  font-size: 14px;
  color: rgba(92, 51, 23, 0.7);
  text-align: center;
  margin: 0;
`;

const hoverOverlayStyles = css`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;

  ${cardButtonStyles}:hover & {
    opacity: 1;
  }
`;

const orderCards = [
  {
    id: 1,
    title: '일반주문',
    icon: ShoppingCart,
    description: '메뉴를 선택하여 주문하세요',
    link: '/order'
  },
  {
    id: 2,
    title: '음성주문',
    icon: Mic,
    description: '음성으로 간편하게 주문하세요',
    link: '/voice-order'
  },
  {
    id: 3,
    title: '주문내역',
    icon: Clock,
    description: '이전 주문을 확인하세요',
    link: '/order-history'
  }
];

export default function OrderSection() {
  return (
    <section css={sectionStyles}>
      <div css={headerStyles}>
        <h2 css={titleStyles}>ORDER</h2>
      </div>

      <div css={gridStyles}>
        {orderCards.map((card) => {
          const Icon = card.icon;
          return (
            <button key={card.id} css={cardButtonStyles}>
              {/* Card Content */}
              <div css={cardContentStyles}>
                <div css={iconWrapperStyles}>
                  <Icon size={48} color="#5C3317" strokeWidth={1.5} />
                </div>
                <h3 css={cardTitleStyles}>{card.title}</h3>
                <p css={cardDescriptionStyles}>{card.description}</p>
              </div>

              {/* Hover Effect */}
              <div css={hoverOverlayStyles} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
