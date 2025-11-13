"use client";

import styled from "@emotion/styled";
import Header from "@/components/main/Header";
import { Settings } from "lucide-react";

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

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.background};
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  background: ${({ variant, theme }) =>
    variant === "primary" ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ variant, theme }) =>
    variant === "primary" ? theme.colors.white : theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export default function UpdateInfoPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("정보가 수정되었습니다!");
  };

  return (
    <Container>
      <Header />
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Settings size={48} strokeWidth={2} />
            정보 수정
          </PageTitle>

          <FormCard>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">이름</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="홍길동"
                  defaultValue="홍길동"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="010-1234-5678"
                  defaultValue="010-1234-5678"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  defaultValue="example@email.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address">주소</Label>
                <Input
                  type="text"
                  id="address"
                  placeholder="서울시 강남구..."
                  defaultValue="서울시 강남구 테헤란로 123"
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button">취소</Button>
                <Button type="submit" variant="primary">
                  저장하기
                </Button>
              </ButtonGroup>
            </form>
          </FormCard>
        </ContentWrapper>
      </Main>
    </Container>
  );
}

