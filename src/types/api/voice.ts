// Voice Order API Types

export interface StartChatRequest {
  customer_name: string;
}

export interface StartChatResponse {
  session_id: string;
  greeting: string;
}

export interface SendMessageResponse {
  text: string; // AI 응답 텍스트
  recognized_text: string; // 음성 인식된 사용자 발화
  order_data: OrderData | null;
  is_completed: boolean;
}

export interface OrderData {
  dinner_type: string;
  serving_style: "simple" | "grand" | "deluxe";
  delivery_date: string; // ISO 8601 format
  serves_count?: number;
  
  // 발렌타인 디너
  wine_count?: number;
  steak_count?: number;
  napkin_count?: number;
  
  // 프렌치 디너
  coffee_cup_count?: number;
  salad_count?: number;
  
  // 잉글리시 디너
  egg_scramble_count?: number;
  bacon_count?: number;
  bread_count?: number;
  
  // 샴페인 축제 디너
  champagne_count?: number;
  baguette_count?: number;
  coffee_pot_count?: number;
}

export interface ResetChatResponse {
  message: string;
}

export interface HealthCheckResponse {
  status: string;
  active_sessions: number;
}

export interface ServerInfoResponse {
  message: string;
  version: string;
  endpoints: {
    start_chat: string;
    send_message: string;
    get_order: string;
    reset_chat: string;
  };
}

export interface ConversationMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface ApiError {
  detail: string;
}

