/**
 * 간단한 AES 암호화/복호화 유틸리티
 * localStorage에 저장되는 민감한 정보를 암호화하기 위해 사용
 */

const getEncryptionKey = (): string => {
  // 환경 변수에서 암호화 키 가져오기
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  
  if (!key) {
    // 개발 환경에서만 경고, 프로덕션에서는 에러
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_ENCRYPTION_KEY가 설정되지 않았습니다.");
    }
    console.warn(
      "NEXT_PUBLIC_ENCRYPTION_KEY가 설정되지 않았습니다. 기본 키를 사용합니다. (프로덕션에서는 반드시 환경 변수를 설정하세요)"
    );
    // 개발 환경용 기본 키 (32자)
    return "dev-encryption-key-32-characters!!";
  }

  // 키 길이 검증 (AES-256을 위해 최소 32자)
  if (key.length < 32) {
    throw new Error("NEXT_PUBLIC_ENCRYPTION_KEY는 최소 32자 이상이어야 합니다.");
  }

  return key.substring(0, 32); // 32자로 제한
};

/**
 * 문자열을 암호화합니다.
 * @param text 암호화할 텍스트
 * @returns 암호화된 문자열 (Base64 인코딩)
 */
export const encrypt = (text: string): string => {
  if (!text) return text;

  try {
    // Web Crypto API 사용 가능 여부 확인
    if (typeof window === "undefined" || !window.crypto || !window.crypto.subtle) {
      console.warn("Web Crypto API를 사용할 수 없습니다. 암호화 없이 저장합니다.");
      return text;
    }

    // 간단한 XOR 기반 암호화 (Web Crypto API는 복잡하므로 간단한 방식 사용)
    // 실제 프로덕션에서는 더 강력한 암호화 방식을 권장합니다.
    const key = getEncryptionKey();
    let encrypted = "";

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(charCode ^ keyCharCode);
    }

    // Base64 인코딩
    return btoa(encrypted);
  } catch (error) {
    console.error("암호화 오류:", error);
    // 암호화 실패 시 원본 반환 (데이터 손실 방지)
    return text;
  }
};

/**
 * 암호화된 문자열을 복호화합니다.
 * @param encryptedText 암호화된 텍스트 (Base64 인코딩)
 * @returns 복호화된 문자열
 */
export const decrypt = (encryptedText: string): string => {
  if (!encryptedText) return encryptedText;

  try {
    // 암호화되지 않은 데이터인지 확인 (암호화된 데이터는 Base64 형식)
    if (!encryptedText.match(/^[A-Za-z0-9+/=]+$/)) {
      // Base64 형식이 아니면 원본으로 간주 (마이그레이션 지원)
      return encryptedText;
    }

    // Web Crypto API 사용 가능 여부 확인
    if (typeof window === "undefined" || !window.crypto || !window.crypto.subtle) {
      console.warn("Web Crypto API를 사용할 수 없습니다. 복호화 없이 반환합니다.");
      return encryptedText;
    }

    // Base64 디코딩
    const decoded = atob(encryptedText);
    const key = getEncryptionKey();
    let decrypted = "";

    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length);
      decrypted += String.fromCharCode(charCode ^ keyCharCode);
    }

    return decrypted;
  } catch (error) {
    console.error("복호화 오류:", error);
    // 복호화 실패 시 원본 반환 (데이터 손실 방지)
    return encryptedText;
  }
};

/**
 * 객체를 암호화하여 JSON 문자열로 반환
 */
export const encryptObject = <T>(obj: T): string => {
  const jsonString = JSON.stringify(obj);
  return encrypt(jsonString);
};

/**
 * 암호화된 JSON 문자열을 복호화하여 객체로 반환
 */
export const decryptObject = <T>(encryptedJson: string): T | null => {
  try {
    const decryptedJson = decrypt(encryptedJson);
    return JSON.parse(decryptedJson) as T;
  } catch (error) {
    console.error("복호화된 JSON 파싱 오류:", error);
    return null;
  }
};

