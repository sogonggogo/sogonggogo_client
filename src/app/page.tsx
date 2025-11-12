'use client';

import styled from '@emotion/styled';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OrderHistory from '@/components/OrderHistory';
import OrderSection from '@/components/OrderSection';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5dc;
`;

const Main = styled.main`
  padding-top: 88px;
  padding-left: 80px;
  padding-right: 80px;
  padding-bottom: 64px;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const HeroWrapper = styled.div`
  flex: 1;
`;

const SidebarWrapper = styled.div`
  width: 400px;
`;

const BottomSection = styled.div`
  margin-top: 32px;
`;

export default function Home() {
  return (
    <Container>
      <Header />

      {/* Main Content */}
      <Main>
        <ContentWrapper>
          {/* Top Section: Hero + Order History */}
          <TopSection>
            {/* Hero Section */}
            <HeroWrapper>
              <HeroSection />
            </HeroWrapper>

            {/* Order History Sidebar */}
            <SidebarWrapper>
              <OrderHistory />
            </SidebarWrapper>
          </TopSection>

          {/* Bottom Section: Order Cards */}
          <BottomSection>
            <OrderSection />
          </BottomSection>
        </ContentWrapper>
      </Main>
    </Container>
  );
}
