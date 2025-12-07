import type {
  CheckEmailResponse,
  UserResponse,
  SignupRequest,
} from "@/types/api/user";

// CORS 이슈 해결을 위해 Next.js rewrites를 통한 프록시 사용
// next.config.ts에서 /api/* 요청을 실제 서버로 프록시 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

class UserApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 이메일 중복 체크
   * GET /api/users/check-email?email=user@example.com
   */
  async checkEmail(email: string): Promise<CheckEmailResponse> {
    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(
      `${this.baseUrl}/api/users/check-email?email=${encodedEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`이메일 중복 확인 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 회원가입
   * POST /api/users/signup
   */
  async signup(data: SignupRequest): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("이미 사용 중인 이메일입니다.");
      }
      if (response.status === 400) {
        throw new Error("검증 실패.");
      }
      throw new Error(`회원가입 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 로그인
   * POST /api/users/login
   */
  async login(email: string, password: string): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include", // 쿠키를 포함하여 세션 관리
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      throw new Error(`로그인 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 내 정보 조회
   * GET /api/users/me (세션 필요)
   * 로그아웃 상태(401)에서는 null을 반환합니다.
   */
  async getMe(): Promise<UserResponse | null> {
    const response = await fetch(`${this.baseUrl}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 쿠키를 포함하여 세션 전송
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 로그아웃 상태는 정상적인 상태이므로 에러를 throw하지 않고 null 반환
        return null;
      }
      throw new Error(`정보 조회 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 내 정보 수정
   * PUT /api/users/me (세션 필요)
   */
  async updateMe(data: Partial<SignupRequest>): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/api/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("변경할 필드가 없습니다.");
      }
      if (response.status === 401) {
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`정보 수정 실패: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 로그아웃
   * POST /api/users/logout (세션 필요)
   */
  async logout(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`로그아웃 실패: ${response.statusText}`);
    }
  }
}

// Singleton instance
export const userApi = new UserApiService();

export default userApi;

