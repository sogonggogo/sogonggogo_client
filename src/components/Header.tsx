/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { User } from 'lucide-react';

const headerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #F5F5DC;
  border-bottom: 1px solid #E5DCC8;
`;

const containerStyles = css`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 96px;
`;

const contentStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const logoContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 128px;
`;

const logoStyles = css`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.8px;
  color: #D62300;
  margin: 0;
`;

const hiddenTextStyles = css`
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #5C3317;
  opacity: 0;
`;

const loginButtonStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5C3317;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div css={containerStyles}>
        <div css={contentStyles}>
          {/* Logo */}
          <div css={logoContainerStyles}>
            <h1 css={logoStyles}>BURGER KING</h1>
            
            {/* Hidden Navigation Text */}
            <span css={hiddenTextStyles}>
              특별한 날에 당신의 아내를 감동시켜라
            </span>
          </div>

          {/* Login Button */}
          <button css={loginButtonStyles}>
            <User size={20} strokeWidth={1.67} />
            <span>로그인</span>
          </button>
        </div>
      </div>
    </header>
  );
}
