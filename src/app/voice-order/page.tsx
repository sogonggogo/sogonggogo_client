"use client";

import styled from "@emotion/styled";
import { Mic } from "lucide-react";
import VoiceRecorder from "@/components/voice-order/VoiceRecorder";

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function VoiceOrderPage() {
  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Mic size={48} strokeWidth={2} />
            음성주문
          </PageTitle>
          <VoiceRecorder />
        </ContentWrapper>
      </Main>
    </Container>
  );
}
