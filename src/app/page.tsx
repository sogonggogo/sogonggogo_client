/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OrderHistory from '@/components/OrderHistory';
import OrderSection from '@/components/OrderSection';

const containerStyles = css`
  min-height: 100vh;
  background-color: #F5F5DC;
`;

const mainStyles = css`
  padding-top: 88px;
  padding-left: 80px;
  padding-right: 80px;
  padding-bottom: 64px;
`;

const contentWrapperStyles = css`
  max-width: 1280px;
  margin: 0 auto;
`;

const topSectionStyles = css`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const heroWrapperStyles = css`
  flex: 1;
`;

const sidebarWrapperStyles = css`
  width: 400px;
`;

const bottomSectionStyles = css`
  margin-top: 32px;
`;

export default function Home() {
  return (
    <div css={containerStyles}>
      <Header />
      
      {/* Main Content */}
      <main css={mainStyles}>
        <div css={contentWrapperStyles}>
          {/* Top Section: Hero + Order History */}
          <div css={topSectionStyles}>
            {/* Hero Section */}
            <div css={heroWrapperStyles}>
              <HeroSection />
            </div>

            {/* Order History Sidebar */}
            <div css={sidebarWrapperStyles}>
              <OrderHistory />
            </div>
          </div>

          {/* Bottom Section: Order Cards */}
          <div css={bottomSectionStyles}>
            <OrderSection />
          </div>
        </div>
      </main>
    </div>
  );
}
