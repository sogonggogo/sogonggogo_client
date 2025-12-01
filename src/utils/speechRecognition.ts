// Web Speech API wrapper for speech recognition

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class SpeechRecognitionService {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
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
    
    // 연속 인식 (false: 한 번만 인식)
    this.recognition.continuous = false;
    
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
    onError?: (error: string) => void
  ): void {
    if (this.isListening) {
      console.warn("Already listening");
      return;
    }

    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const result = event.results[last];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;

      onResult({
        transcript,
        confidence,
        isFinal,
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      this.isListening = false;
      
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
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error("Failed to start recognition:", error);
      if (onError) {
        onError("음성 인식을 시작할 수 없습니다.");
      }
    }
  }

  /**
   * 음성 인식 중지
   */
  stop(): void {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * 음성 인식 취소
   */
  abort(): void {
    if (this.isListening) {
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
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
};

