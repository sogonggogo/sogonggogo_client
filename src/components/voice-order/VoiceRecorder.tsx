"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, RotateCcw, Loader2 } from "lucide-react";
import voiceOrderApi from "@/services/voiceOrderApi";
import { getUserInfo } from "@/utils/userStorage";
import {
  getSpeechRecognition,
  isSpeechRecognitionSupported,
} from "@/utils/speechRecognition";
import type {
  ConversationMessage,
  OrderData,
} from "@/types/voiceOrderTypes";

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

const ConversationBox = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.buttonBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MessageBubble = styled.div<{ role: "user" | "assistant" }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.6;
  max-width: 80%;
  align-self: ${({ role }) => (role === "user" ? "flex-end" : "flex-start")};
  background: ${({ role, theme }) =>
    role === "user" ? theme.colors.primary : theme.colors.white};
  color: ${({ role, theme }) =>
    role === "user" ? theme.colors.white : theme.colors.accent};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.sm};
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.whiteAlpha80};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
`;

const InstructionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  text-align: center;
  max-width: 500px;
  line-height: 1.6;
`;

const InterimText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.whiteAlpha80};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function VoiceRecorder() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [interimText, setInterimText] = useState<string>("");
  const [isSupported, setIsSupported] = useState(true);

  // Initialize chat session on component mount
  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
    if (isSpeechRecognitionSupported()) {
      initializeChat();
    }
  }, []);

  const initializeChat = async () => {
    try {
      setError(null);
      const userInfo = getUserInfo();
      const customerName = userInfo?.name || "고객";

      const response = await voiceOrderApi.startChat(customerName);
      setSessionId(response.session_id);
      
      // Add greeting to conversation
      setConversation([
        {
          role: "assistant",
          text: response.greeting,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setError("대화 시작에 실패했습니다. 다시 시도해주세요.");
      console.error("Chat initialization error:", err);
    }
  };

  const startRecording = () => {
    try {
      setError(null);
      setInterimText("");
      const speechRecognition = getSpeechRecognition();

      speechRecognition.start(
        (result) => {
          if (result.isFinal) {
            // 최종 결과 - 서버로 전송
            sendTextToServer(result.transcript);
            setInterimText("");
          } else {
            // 중간 결과 - UI에만 표시
            setInterimText(result.transcript);
          }
        },
        (error) => {
          setError(error);
          setIsRecording(false);
        }
      );

      setIsRecording(true);
    } catch (err: any) {
      setError(err.message || "음성 인식을 시작할 수 없습니다.");
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    try {
      const speechRecognition = getSpeechRecognition();
      speechRecognition.stop();
      setIsRecording(false);
    } catch (err) {
      console.error("Stop recording error:", err);
    }
  };

  const sendTextToServer = async (text: string) => {
    if (!sessionId || !text.trim()) {
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Send text to server
      const response = await voiceOrderApi.sendTextMessage(sessionId, text);

      // Add messages to conversation
      setConversation((prev) => [
        ...prev,
        {
          role: "user",
          text: text,
          timestamp: new Date(),
        },
        {
          role: "assistant",
          text: response.text,
          timestamp: new Date(),
        },
      ]);

      // Check if order is completed
      if (response.is_completed && response.order_data) {
        setOrderData(response.order_data);
        setTimeout(() => {
          handleOrderComplete(response.order_data!);
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "메시지 전송 중 오류가 발생했습니다.");
      console.error("Send text error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOrderComplete = (orderData: OrderData) => {
    // TODO: Convert order data to the format expected by the app
    // For now, show alert and redirect
    alert("주문이 완료되었습니다! 주문 내역을 확인해주세요.");
    router.push("/prev-order");
  };

  const handleReset = async () => {
    if (!sessionId) return;

    try {
      setError(null);
      await voiceOrderApi.resetChat(sessionId);
      setConversation([]);
      setOrderData(null);
      setInterimText("");
      await initializeChat();
    } catch (err) {
      setError("대화 초기화에 실패했습니다.");
      console.error("Reset error:", err);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isSupported) {
    return (
      <VoiceCard>
        <ErrorMessage>
          이 브라우저는 음성 인식을 지원하지 않습니다.
          <br />
          Chrome, Edge, Safari 브라우저를 사용해주세요.
        </ErrorMessage>
      </VoiceCard>
    );
  }

  return (
    <VoiceCard>
      <MicButton
        isRecording={isRecording}
        onClick={toggleRecording}
        disabled={isProcessing || !sessionId}
      >
        {isRecording ? (
          <MicOff size={80} strokeWidth={2} />
        ) : (
          <Mic size={80} strokeWidth={2} />
        )}
      </MicButton>

      <StatusText isRecording={isRecording}>
        {isProcessing
          ? "처리 중..."
          : isRecording
          ? "음성 인식 중... 클릭하여 중지"
          : "마이크 버튼을 눌러 주문하세요"}
      </StatusText>

      <InstructionText>
        예시: "발렌타인 디너 디럭스 스타일로 내일 저녁 6시에 주문하고 싶어요"
        <br />
        <small>💡 브라우저에서 직접 음성을 텍스트로 변환합니다</small>
      </InstructionText>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {interimText && (
        <InterimText>
          🎤 {interimText}
        </InterimText>
      )}

      {isProcessing && (
        <LoadingIndicator>
          <Loader2 size={20} />
          <span>AI가 응답을 생성하고 있습니다...</span>
        </LoadingIndicator>
      )}

      {conversation.length > 0 && (
        <>
          <ConversationBox>
            {conversation.map((message, index) => (
              <MessageBubble key={index} role={message.role}>
                {message.text}
              </MessageBubble>
            ))}
          </ConversationBox>

          <ActionButtons>
            <ActionButton onClick={handleReset} disabled={isProcessing}>
              <RotateCcw size={18} />
              대화 초기화
            </ActionButton>
          </ActionButtons>
        </>
      )}

      {orderData && (
        <StatusText isRecording={false} style={{ color: "#ffa500" }}>
          ✓ 주문이 완료되었습니다!
        </StatusText>
      )}
    </VoiceCard>
  );
}

