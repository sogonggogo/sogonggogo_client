import type {
  StartChatRequest,
  StartChatResponse,
  SendMessageResponse,
  ResetChatResponse,
} from "@/types/api/voice";

// Next.js API 라우트를 통해 프록시 사용 (Mixed Content 및 CORS 문제 해결)
const API_BASE_URL = "";

class VoiceOrderApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 채팅 세션 시작
   * POST /api/chat/start
   * 명세서: POST /api/chat/start
   */
  async startChat(customerName: string): Promise<StartChatResponse> {
    const requestData: StartChatRequest = {
      customer_name: customerName,
    };

    const response = await fetch(`${this.baseUrl}/api/chat/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`채팅 시작 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 텍스트 메시지 전송
   * POST /api/chat/message
   * 명세서: POST /api/chat/message
   */
  async sendTextMessage(
    sessionId: string,
    text: string
  ): Promise<SendMessageResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`메시지 전송 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 채팅 세션 초기화
   * POST /api/chat/reset/{session_id}
   * 명세서: POST /api/chat/reset/{session_id} (경로 파라미터 사용)
   */
  async resetChat(sessionId: string): Promise<ResetChatResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/chat/reset/${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`채팅 초기화 실패: ${response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
export const voiceOrderApi = new VoiceOrderApiService();

export default voiceOrderApi;
