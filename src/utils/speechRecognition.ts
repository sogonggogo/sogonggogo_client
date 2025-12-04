// Web Speech API wrapper for speech recognition

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionType = any;

export class SpeechRecognitionService {
  private recognition: SpeechRecognitionType;
  private isListening: boolean = false;
  private silenceTimer: NodeJS.Timeout | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      throw new Error("이 브라우저는 음성 인식을 지원하지 않습니다.");
    }

    this.recognition = new SpeechRecognition();
    this.setupRecognition();
  }

  private setupRecognition() {
    // 한국어 설정
    this.recognition.lang = "ko-KR";

    // 연속 인식 (true: 계속 인식)
    this.recognition.continuous = true;

    // 중간 결과 반환 여부
    this.recognition.interimResults = true;

    // 최대 대안 개수
    this.recognition.maxAlternatives = 1;
  }

  /**
   * 음성 인식 시작
   */
  start(
    onResult: (result: SpeechRecognitionResult) => void,
    onError?: (error: string) => void,
    onEnd?: () => void
  ): void {
    if (this.isListening) {
      console.warn("Already listening");
      return;
    }

    this.onEndCallback = onEnd || null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const result = event.results[last];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;

      // 침묵 타이머 리셋
      this.resetSilenceTimer();

      onResult({
        transcript,
        confidence,
        isFinal,
      });

      // 최종 결과가 나오면 2초 침묵 타이머 시작
      if (isFinal) {
        this.startSilenceTimer();
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      this.isListening = false;
      this.clearSilenceTimer();

      let errorMessage = "음성 인식 중 오류가 발생했습니다.";

      switch (event.error) {
        case "no-speech":
          errorMessage = "음성이 감지되지 않았습니다.";
          break;
        case "audio-capture":
          errorMessage = "마이크를 찾을 수 없습니다.";
          break;
        case "not-allowed":
          errorMessage = "마이크 권한이 거부되었습니다.";
          break;
        case "network":
          errorMessage = "네트워크 오류가 발생했습니다.";
          break;
      }

      if (onError) {
        onError(errorMessage);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.clearSilenceTimer();

      // 종료 콜백 호출
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error("Failed to start recognition:", error);
      this.clearSilenceTimer();
      if (onError) {
        onError("음성 인식을 시작할 수 없습니다.");
      }
    }
  }

  /**
   * 2초 침묵 타이머 시작
   */
  private startSilenceTimer(): void {
    this.clearSilenceTimer();

    // 2초 동안 말이 없으면 자동 종료
    this.silenceTimer = setTimeout(() => {
      if (this.isListening) {
        this.stop();
      }
    }, 2000);
  }

  /**
   * 침묵 타이머 리셋
   */
  private resetSilenceTimer(): void {
    this.clearSilenceTimer();
  }

  /**
   * 침묵 타이머 제거
   */
  private clearSilenceTimer(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  /**
   * 음성 인식 중지
   */
  stop(): void {
    if (this.isListening) {
      this.clearSilenceTimer();
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * 음성 인식 취소
   */
  abort(): void {
    if (this.isListening) {
      this.clearSilenceTimer();
      this.recognition.abort();
      this.isListening = false;
    }
  }

  /**
   * 현재 인식 중인지 확인
   */
  getIsListening(): boolean {
    return this.isListening;
  }
}

// Singleton instance
let speechRecognitionInstance: SpeechRecognitionService | null = null;

export const getSpeechRecognition = (): SpeechRecognitionService => {
  if (!speechRecognitionInstance) {
    speechRecognitionInstance = new SpeechRecognitionService();
  }
  return speechRecognitionInstance;
};

// Check if browser supports speech recognition
export const isSpeechRecognitionSupported = (): boolean => {
  return !!(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SpeechRecognition ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).webkitSpeechRecognition
  );
};
