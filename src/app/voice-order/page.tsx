"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import Header from "@/components/main/Header";
import { Mic, MicOff } from "lucide-react";

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

const VoiceCard = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxxl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const MicButton = styled.button<{ isRecording: boolean }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: none;
  background: ${({ isRecording, theme }) =>
    isRecording ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ isRecording }) =>
    isRecording &&
    `
    animation: pulse 1.5s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const StatusText = styled.div<{ isRecording: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ isRecording, theme }) =>
    isRecording ? theme.colors.primary : theme.colors.accent};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  text-align: center;
`;

const TranscriptBox = styled.div`
  width: 100%;
  min-height: 150px;
  background: ${({ theme }) => theme.colors.buttonBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.6;
`;

const InstructionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  text-align: center;
  max-width: 500px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const ActionButton = styled.button<{ variant?: "primary" | "secondary" }>`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function VoiceOrderPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript("음성을 인식하고 있습니다...");
      // 실제로는 여기서 음성 인식 API 호출
      setTimeout(() => {
        setTranscript("발렌타인 디너 디럭스 스타일로 주문하고 싶어요.");
        setIsRecording(false);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleReset = () => {
    setTranscript("");
    setIsRecording(false);
  };

  const handleSubmit = () => {
    if (!transcript) {
      alert("먼저 음성으로 주문해주세요!");
      return;
    }
    alert("음성 주문이 처리되었습니다!");
  };

  return (
    <Container>
      <Header />
      <Main>
        <ContentWrapper>
          <PageTitle>
            <Mic size={48} strokeWidth={2} />
            음성주문
          </PageTitle>

          <VoiceCard>
            <MicButton
              isRecording={isRecording}
              onClick={toggleRecording}
            >
              {isRecording ? (
                <MicOff size={80} strokeWidth={2} />
              ) : (
                <Mic size={80} strokeWidth={2} />
              )}
            </MicButton>

            <StatusText isRecording={isRecording}>
              {isRecording
                ? "녹음 중... 클릭하여 중지"
                : "마이크 버튼을 눌러 주문하세요"}
            </StatusText>

            <InstructionText>
              예시: "발렌타인 디너 디럭스 스타일로 주문하고 싶어요"
            </InstructionText>

            {transcript && (
              <>
                <TranscriptBox>{transcript}</TranscriptBox>
                <ActionButtons>
                  <ActionButton onClick={handleReset}>
                    다시 녹음
                  </ActionButton>
                  <ActionButton variant="primary" onClick={handleSubmit}>
                    주문하기
                  </ActionButton>
                </ActionButtons>
              </>
            )}
          </VoiceCard>
        </ContentWrapper>
      </Main>
    </Container>
  );
}

