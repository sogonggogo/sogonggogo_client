"use client";

import styled from "@emotion/styled";
import Header from "@/components/main/Header";
import HeroSection from "@/components/main/HeroSection";
import OrderHistory from "@/components/main/OrderHistory";
import OrderSection from "@/components/main/OrderSection";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.headerHeight};
  padding-left: ${({ theme }) => theme.spacing.container};
  padding-right: ${({ theme }) => theme.spacing.container};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HeroWrapper = styled.div`
  flex: 2;
  min-width: 0;
`;

const SidebarWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const BottomSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
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
