/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

const headerStyles = css`
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  background-color: #ffffff;
  padding: 1.5rem;
`;

const containerStyles = css`
  margin: 0 auto;
  max-width: 80rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const leftSectionStyles = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const titleStyles = css`
  font-size: 1.875rem;
  font-weight: 700;
  color: #ea580c;
`;

const subtitleStyles = css`
  font-size: 1rem;
  color: #525252;
  margin-top: -0.25rem;
`;

const loginButtonStyles = css`
  margin-left: auto;
  border: 1px solid #d4d4d4;
  background-color: #ffffff;
  color: #000000;
`;

export function Header() {
  return (
    <header css={headerStyles}>
      <div css={containerStyles}>
        <div css={leftSectionStyles}>
          <Logo style={{ width: "4rem", height: "4rem" }} />
          <div>
            <h1 css={titleStyles}>미스터 대박</h1>
            <p css={subtitleStyles}>디너 서비스</p>
          </div>
        </div>
        <Button variant="outline" customCss={loginButtonStyles}>
          로그인
        </Button>
      </div>
    </header>
  );
}
