"use client";

import styled from "@emotion/styled";
import { UserPlus } from "lucide-react";
import SignupForm from "@/components/login/SignupForm";

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
  max-width: ${({ theme }) => theme.sizes.heroWidth};
  margin: 0 auto;
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

export default function SignupPage() {
  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <UserPlus size={48} strokeWidth={2} />
            회원가입
          </PageTitle>
          <SignupForm />
        </ContentWrapper>
      </Main>
    </Container>
  );
}



