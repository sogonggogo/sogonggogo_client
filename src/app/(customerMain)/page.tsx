"use client";

import styled from "@emotion/styled";
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TopSection = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
`;

const HeroWrapper = styled.div`
  grid-column: span 2;
  min-width: 0;
`;

const SidebarWrapper = styled.div`
  grid-column: span 1;
  min-width: 0;
`;

const BottomSection = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
`;

export default function Home() {
  return (
    <Container>
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
