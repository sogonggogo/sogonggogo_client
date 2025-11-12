"use client";

import styled from "@emotion/styled";
import { User } from "lucide-react";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #f5f5dc;
  border-bottom: 1px solid #e5dcc8;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 96px;
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
  font-family: "Arial Black", Arial, sans-serif;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.8px;
  color: #d62300;
  margin: 0;
`;

const HiddenText = styled.span`
  font-family: "Arial Black", Arial, sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #5c3317;
  opacity: 0;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5c3317;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;

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
