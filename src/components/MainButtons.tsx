/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";

const containerStyles = css`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const buttonStyles = css`
  padding: 1rem 3rem;
  background-color: #ea580c;
  color: #ffffff;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c2410c;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;

export function MainButtons() {
  return (
    <div css={containerStyles}>
      <button css={buttonStyles}>주문하기</button>
      <button css={buttonStyles}>주문목록</button>
    </div>
  );
}
