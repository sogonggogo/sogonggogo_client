"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { User, Settings } from "lucide-react";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  background-color: ${({ theme }) => theme.colors.background};
  height: ${({ theme }) => theme.spacing.headerHeight};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidthFull};
  height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.container};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 128px;

  @media (max-width: 1200px) {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 0;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bagelfat};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const HiddenText = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: opacity ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Container>
        <Content>
          {/* Logo */}
          <LogoContainer>
            <LogoLink href="/">
              <Logo>MR.DAEBAK</Logo>
            </LogoLink>

            {/* Hidden Navigation Text */}
            <HiddenText>특별한 날에 당신의 아내를 감동시켜라</HiddenText>
          </LogoContainer>

          {/* Button Group */}
          <ButtonGroup>
            {/* Edit Info Button */}
            <Link href="/update-info" style={{ textDecoration: "none" }}>
              <HeaderButton>
                <Settings size={20} strokeWidth={1.67} />
                <span>정보 수정</span>
              </HeaderButton>
            </Link>

            {/* Login Button */}
            <Link href="/login" style={{ textDecoration: "none" }}>
              <HeaderButton>
                <User size={20} strokeWidth={1.67} />
                <span>로그인</span>
              </HeaderButton>
            </Link>
          </ButtonGroup>
        </Content>
      </Container>
    </HeaderContainer>
  );
}
