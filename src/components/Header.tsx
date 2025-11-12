"use client";

import styled from "@emotion/styled";
import { User } from "lucide-react";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidthFull};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.container};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 128px;
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const HiddenText = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: opacity ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.8;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Container>
        <Content>
          {/* Logo */}
          <LogoContainer>
            <Logo>BURGER KING</Logo>

            {/* Hidden Navigation Text */}
            <HiddenText>특별한 날에 당신의 아내를 감동시켜라</HiddenText>
          </LogoContainer>

          {/* Login Button */}
          <LoginButton>
            <User size={20} strokeWidth={1.67} />
            <span>로그인</span>
          </LoginButton>
        </Content>
      </Container>
    </HeaderContainer>
  );
}
