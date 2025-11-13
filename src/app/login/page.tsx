"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { User } from "lucide-react";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.headerHeight};
  padding-left: ${({ theme }) => theme.spacing.container};
  padding-right: ${({ theme }) => theme.spacing.container};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxxl};
  box-shadow: ${({ theme }) => theme.shadow.xl};
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
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

const LoginButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  margin-top: ${({ theme }) => theme.spacing.lg};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accentAlpha70};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 되었습니다!");
  };

  return (
    <Container>
      <Main>
        <LoginCard>
          <PageTitle>
            <User size={36} strokeWidth={2} />
            로그인
          </PageTitle>

          <form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                id="email"
                placeholder="example@email.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </FormGroup>

            <LoginButton type="submit">로그인</LoginButton>

            <LinksContainer>
              <StyledLink href="/signup">회원가입</StyledLink>
              <StyledLink href="/forgot-password">비밀번호 찾기</StyledLink>
            </LinksContainer>
          </form>
        </LoginCard>
      </Main>
    </Container>
  );
}

