"use client";

import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, RotateCcw, Loader2 } from "lucide-react";
import voiceOrderApi from "@/services/voice";
import { getUserInfo } from "@/storage/user";
import {
  getSpeechRecognition,
  isSpeechRecognitionSupported,
} from "@/utils/speechRecognition";
import type { ConversationMessage, OrderData } from "@/types/api/voice";
import { dinnerMenus } from "@/constants/menus";
import type { ServingStyleType } from "@/types/domain/style";
import { getItemsForMenu } from "@/utils/menu";
import type { SelectedItem } from "@/types/domain/menu";
import { saveOrders } from "@/storage/order";
import { saveDeliveryInfo } from "@/storage/delivery";

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
    0%,
    100% {
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

  /* 스크롤바 스타일 개선 - 투명 컨테이너 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(92, 51, 23, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: background 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(92, 51, 23, 0.5);
  }

  /* Firefox 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgba(92, 51, 23, 0.3) transparent;
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
    variant === "primary"
      ? theme.colors.primary
      : theme.colors.buttonBackground};
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

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 테스트 모드 비활성화 (실제 API 통신)
const TEST_MODE = false;

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
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session on component mount
  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
    if (isSpeechRecognitionSupported()) {
      if (TEST_MODE) {
        // 테스트 모드: API 호출 없이 초기화
        setSessionId("test-session-id");
        setConversation([
          {
            role: "assistant",
            text: "테스트 모드입니다. 음성을 말씀하시면 변환된 텍스트가 콘솔에 출력됩니다.",
            timestamp: new Date(),
          },
        ]);
      } else {
        initializeChat();
      }
    }
  }, []);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, interimText]);

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
            // 최종 결과 - UI 상태 유지하고 서버로 전송
            setInterimText("");
            setIsRecording(false); // 음성 인식 종료
            sendTextToServer(result.transcript);
          } else {
            // 중간 결과 - UI에만 표시
            setInterimText(result.transcript);
          }
        },
        (error) => {
          setError(error);
          setIsRecording(false);
        },
        () => {
          // 음성 인식 종료 콜백 (자동 종료 포함)
          // 최종 결과가 없이 종료된 경우에만 UI 업데이트
          setIsRecording(false);
          setInterimText("");
        }
      );

      setIsRecording(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "음성 인식을 시작할 수 없습니다.";
      setError(errorMessage);
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
      setError(null);

      // 한글 스타일을 영어로 변환
      const convertedText = text
        .replace(/심플\s*스타일/gi, "simple")
        .replace(/그랜드\s*스타일/gi, "grand")
        .replace(/디럭스\s*스타일/gi, "deluxe");

      if (TEST_MODE) {
        // 테스트 모드: 콘솔에 출력만 하고 API 호출 안함
        setIsProcessing(true);

        // 대화 내역에 추가 (테스트용 응답 포함)
        setConversation((prev) => [
          ...prev,
          {
            role: "user",
            text: text,
            timestamp: new Date(),
          },
          {
            role: "assistant",
            text: `✅ 음성 인식 성공!\n인식된 텍스트: "${text}"\n변환된 텍스트: "${convertedText}"\n\n(테스트 모드: 실제 API 호출 없음)`,
            timestamp: new Date(),
          },
        ]);

        // 짧은 지연 후 처리 완료
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      } else {
        // 사용자 메시지 먼저 추가
        setConversation((prev) => [
          ...prev,
          {
            role: "user",
            text: text,
            timestamp: new Date(),
          },
        ]);

        // 처리 중 상태로 변경
        setIsProcessing(true);

        // 실제 모드: API 호출 (변환된 텍스트 전송)
        const response = await voiceOrderApi.sendTextMessage(
          sessionId,
          convertedText
        );

        // AI 응답 추가
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            text: response.text,
            timestamp: new Date(),
          },
        ]);

        // 처리 완료
        setIsProcessing(false);

        // Check if order is completed
        if (response.is_completed && response.order_data) {
          setOrderData(response.order_data);
          setTimeout(() => {
            handleOrderComplete(response.order_data!);
          }, 2000);
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "메시지 전송 중 오류가 발생했습니다.";
      setError(errorMessage);
      console.error("Send text error:", err);
      setIsProcessing(false);
    }
  };

  const handleOrderComplete = (orderData: OrderData) => {
    try {
      // 1. 디너 타입을 메뉴 ID로 매핑
      const menuMap: Record<string, number> = {
        "발렌타인 디너": 1,
        "프렌치 디너": 2,
        "잉글리시 디너": 3,
        "샴페인 축제 디너": 4,
      };

      const menuId = menuMap[orderData.dinner_type];
      if (!menuId) {
        throw new Error(`알 수 없는 디너 타입: ${orderData.dinner_type}`);
      }

      const menu = dinnerMenus.find((m) => m.id === menuId);
      if (!menu) {
        throw new Error("메뉴를 찾을 수 없습니다.");
      }

      // 2. serving_style 매핑 및 검증
      // API에서 받은 값을 소문자로 변환하고 매핑
      const normalizedStyle = orderData.serving_style?.toLowerCase().trim();

      const styleMap: Record<string, ServingStyleType> = {
        simple: "simple",
        grand: "grand",
        deluxe: "deluxe",
        // 한글도 지원 (혹시 한글로 오는 경우 대비)
        심플: "simple",
        그랜드: "grand",
        디럭스: "deluxe",
      };

      const style = styleMap[normalizedStyle];

      if (!style) {
        throw new Error(
          `알 수 없는 서빙 스타일: "${orderData.serving_style}" (정규화: "${normalizedStyle}")`
        );
      }

      // 3. 메뉴별 아이템 수량 매핑
      const availableItems = getItemsForMenu(menuId);

      // 음성 주문 API의 필드명을 프론트엔드 아이템명으로 매핑
      const voiceToItemMap: Record<number, Record<string, string>> = {
        1: {
          // 발렌타인 디너
          wine_count: "와인",
          steak_count: "스테이크",
          napkin_count: "하트 장식", // napkin_count를 하트 장식으로 매핑
        },
        2: {
          // 프렌치 디너
          coffee_cup_count: "커피",
          wine_count: "와인",
          salad_count: "샐러드",
          steak_count: "스테이크",
        },
        3: {
          // 잉글리시 디너
          egg_scramble_count: "에그 스크램블",
          bacon_count: "베이컨",
          bread_count: "빵",
          steak_count: "스테이크",
        },
        4: {
          // 샴페인 축제 디너
          champagne_count: "샴페인",
          baguette_count: "바게트 빵",
          coffee_pot_count: "커피",
          wine_count: "와인",
          steak_count: "스테이크",
        },
      };

      const itemMapping = voiceToItemMap[menuId];

      const selectedItems: SelectedItem[] = availableItems.map((item) => {
        let quantity = item.defaultQuantity || 1;

        // 음성 주문 데이터에서 해당 아이템의 수량 찾기
        if (itemMapping) {
          for (const [voiceField, itemName] of Object.entries(itemMapping)) {
            if (item.name === itemName) {
              const voiceQuantity = orderData[voiceField as keyof OrderData];
              if (typeof voiceQuantity === "number") {
                quantity = voiceQuantity;
              }
              break;
            }
          }
        }

        return {
          name: item.name,
          quantity,
        };
      });

      // 4. 주문 정보 저장
      const order = {
        id: `voice-order-${Date.now()}`,
        menuId,
        style,
        quantity: 1, // 음성 주문은 기본 1개
        selectedItems,
      };

      saveOrders([order]);

      // 5. 배달 정보 저장 (사용자 정보 기반)
      const userInfo = getUserInfo();
      if (userInfo) {
        // delivery_date 파싱: "2025-12-06T00:00:00" → "2025-12-06"
        const formattedDate = orderData.delivery_date.split("T")[0];

        saveDeliveryInfo({
          address: userInfo.address || "",
          date: formattedDate,
          time: "18:00", // 기본 시간
          cardNumber: userInfo.cardNumber || "",
        });
      } else {
        alert("로그인 후 주문을 진행해주세요.");
        router.push("/login");
        return;
      }

      // 6. 주문 페이지로 이동
      alert("음성 주문이 완료되었습니다! 배달 정보를 확인해주세요.");
      router.push("/delivery-info");
    } catch (error) {
      alert(
        `주문 처리 중 오류가 발생했습니다.\n${
          error instanceof Error ? error.message : "다시 시도해주세요."
        }`
      );
    }
  };

  const handleReset = async () => {
    if (!sessionId) return;

    try {
      setError(null);

      if (TEST_MODE) {
        // 테스트 모드: API 호출 없이 초기화
        setConversation([
          {
            role: "assistant",
            text: "테스트 모드입니다. 음성을 말씀하시면 변환된 텍스트가 콘솔에 출력됩니다.",
            timestamp: new Date(),
          },
        ]);
        setOrderData(null);
        setInterimText("");
      } else {
        // 실제 모드: API 호출
        await voiceOrderApi.resetChat(sessionId);
        setConversation([]);
        setOrderData(null);
        setInterimText("");
        await initializeChat();
      }
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

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {interimText && <InterimText>🎤 {interimText}</InterimText>}

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
            {interimText && (
              <MessageBubble role="user" style={{ opacity: 0.6 }}>
                {interimText}
              </MessageBubble>
            )}
            <div ref={conversationEndRef} />
          </ConversationBox>

          <ActionButtons>
            <ActionButton onClick={handleReset} disabled={isProcessing}>
              <RotateCcw size={16} />
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
