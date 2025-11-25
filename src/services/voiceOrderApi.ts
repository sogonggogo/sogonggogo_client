import {
  StartChatRequest,
  StartChatResponse,
  SendMessageResponse,
  ResetChatResponse,
  HealthCheckResponse,
  ServerInfoResponse,
  ApiError,
} from "@/types/voiceOrderTypes";

// TODO: Replace with actual backend URL when available
const API_BASE_URL = process.env.NEXT_PUBLIC_VOICE_API_URL || "http://localhost:8000";

class VoiceOrderApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 1. GET / - 서버 정보 조회
   */
  async getServerInfo(): Promise<ServerInfoResponse> {
    const response = await fetch(`${this.baseUrl}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server info request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 2. POST /api/chat/start - 대화 시작
   */
  async startChat(customerName: string): Promise<StartChatResponse> {
    const requestBody: StartChatRequest = {
      customer_name: customerName,
    };

    const response = await fetch(`${this.baseUrl}/api/chat/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.detail || "대화 시작 실패");
    }

    return response.json();
  }

  /**
   * 3. POST /api/chat/message - 음성 메시지 전송
   */
  async sendMessage(
    sessionId: string,
    audioFile: File
  ): Promise<SendMessageResponse> {
    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("audio", audioFile);

    const response = await fetch(`${this.baseUrl}/api/chat/message`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.detail || "메시지 전송 실패");
    }

    return response.json();
  }

  /**
   * 4. GET /api/chat/order/{session_id} - 주문 정보 조회
   */
  async getOrder(sessionId: string): Promise<SendMessageResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/chat/order/${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.detail || "주문 정보 조회 실패");
    }

    return response.json();
  }

  /**
   * 5. POST /api/chat/reset/{session_id} - 대화 초기화
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
      const error: ApiError = await response.json();
      throw new Error(error.detail || "대화 초기화 실패");
    }

    return response.json();
  }

  /**
   * 6. GET /api/health - 헬스 체크
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    const response = await fetch(`${this.baseUrl}/api/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
export const voiceOrderApi = new VoiceOrderApiService();

export default voiceOrderApi;

