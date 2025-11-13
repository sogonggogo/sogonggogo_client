"use client";

import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import UpdateInfoForm from "@/components/update-info/UpdateInfoForm";
import { isLoggedIn } from "@/utils/userStorage";

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
  max-width: 600px;
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

export default function UpdateInfoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn()) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/login");
    }
  }, [router]);

  // Don't render until we've checked login status
  if (!isLoggedIn()) {
    return null;
  }

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Settings size={48} strokeWidth={2} />
            정보 수정
          </PageTitle>
          <UpdateInfoForm />
        </ContentWrapper>
      </Main>
    </Container>
  );
}
