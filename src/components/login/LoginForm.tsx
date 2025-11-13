"use client";

import styled from "@emotion/styled";
import Link from "next/link";

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxxl};
  box-shadow: ${({ theme }) => theme.shadow.xl};
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

export default function LoginForm() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 되었습니다!");
  };

  return (
    <LoginCard>
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
  );
}

