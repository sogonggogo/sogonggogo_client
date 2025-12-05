import type {
  StartChatRequest,
  StartChatResponse,
  SendMessageResponse,
  ResetChatResponse,
} from "@/types/api/voice";

const API_BASE_URL = "http://uoscholar-server.store/sogong-ai";

class VoiceOrderApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 채팅 세션 시작
   * POST /api/voice/start-chat
   */
  async startChat(customerName: string): Promise<StartChatResponse> {
    const requestData: StartChatRequest = {
      customer_name: customerName,
    };

    const response = await fetch(`${this.baseUrl}/api/voice/start-chat`, {
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
   * POST /api/voice/send-message
   */
  async sendTextMessage(
    sessionId: string,
    text: string
  ): Promise<SendMessageResponse> {
    const response = await fetch(`${this.baseUrl}/api/voice/send-message`, {
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
   * POST /api/voice/reset-chat
   */
  async resetChat(sessionId: string): Promise<ResetChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/voice/reset-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`채팅 초기화 실패: ${response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
export const voiceOrderApi = new VoiceOrderApiService();

export default voiceOrderApi;

