/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';

const containerStyles = css`
  width: 100%;
  height: 544px;
  border-radius: 24px;
  box-shadow: 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(180deg, #6B4423 0%, #4A2C1A 100%);
`;

const innerContainerStyles = css`
  padding: 32px;
`;

const titleStyles = css`
  font-size: 24px;
  color: white;
  text-align: center;
  margin: 0;
`;

const contentStyles = css`
  margin-top: 32px;
`;

const emptyStateStyles = css`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 14px;
  margin-top: 48px;
`;

export default function OrderHistory() {
  return (
    <div css={containerStyles}>
      <div css={innerContainerStyles}>
        <h3 css={titleStyles}>이전 주문 목록</h3>
        
        <div css={contentStyles}>
          {/* Empty state or order items would go here */}
          <div css={emptyStateStyles}>
            최근 주문 내역이 없습니다
          </div>
        </div>
      </div>
    </div>
  );
}
