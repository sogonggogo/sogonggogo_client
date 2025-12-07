"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/services/user";

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.background};
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.blackAlpha25};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
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

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;


const EmailInputWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;
`;

const EmailInput = styled(Input)`
  flex: 1;
`;

const CheckButton = styled.button<{ isChecking?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: ${({ isChecking }) => (isChecking ? "not-allowed" : "pointer")};
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transition.fast};
  opacity: ${({ isChecking }) => (isChecking ? 0.7 : 1)};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const CheckStatusMessage = styled.p<{ status: "available" | "duplicate" }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ status, theme }) =>
    status === "available" ? "#22c55e" : theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const PasswordMatchMessage = styled.p<{ isMatch: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ isMatch }) => (isMatch ? "#22c55e" : "#ef4444")};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

const PasswordValidMessage = styled.p<{ isValid: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ isValid }) => (isValid ? "#22c55e" : "#ef4444")};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailCheckStatus, setEmailCheckStatus] = useState<
    "idle" | "checking" | "available" | "duplicate"
  >("idle");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "");
      const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "phone") {
      // Format phone number
      const cleaned = value.replace(/[^0-9]/g, "");
      let formatted = cleaned;
      if (cleaned.length <= 3) {
        formatted = cleaned;
      } else if (cleaned.length <= 7) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
          3,
          7
        )}-${cleaned.slice(7, 11)}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Reset email check status when email changes
    if (name === "email") {
      setEmailCheckStatus("idle");
    }

    // Check password length in real-time
    if (name === "password") {
      if (value.length > 0) {
        setPasswordValid(value.length >= 8);
      } else {
        setPasswordValid(null);
      }
    }

    // Check password match in real-time
    if (name === "password" || name === "confirmPassword") {
      const newPassword = name === "password" ? value : formData.password;
      const newConfirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (newConfirmPassword.length > 0) {
        setPasswordMatch(newPassword === newConfirmPassword);
      } else {
        setPasswordMatch(null);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    } else if (emailCheckStatus !== "available") {
      newErrors.email = "이메일 중복 확인을 해주세요.";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "주소를 입력해주세요.";
    }

    // Card number validation (optional)
    if (formData.cardNumber && formData.cardNumber.trim()) {
      const cleaned = formData.cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cleaned)) {
        newErrors.cardNumber = "16자리 카드 번호를 입력해주세요.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 이메일 중복 확인이 완료되지 않은 경우
    if (emailCheckStatus !== "available") {
      setErrors((prev) => ({
        ...prev,
        email: "이메일 중복 확인을 해주세요.",
      }));
      return;
    }

    try {
      // 카드 번호에서 공백 제거
      const cleanedCardNumber = formData.cardNumber.replace(/\s/g, "");

      // API 호출
      await userApi.signup({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        creditCardNumber: cleanedCardNumber || "",
      });

      alert("회원가입이 완료되었습니다! 로그인 후 이용해주세요.");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.";
      setErrors((prev) => ({
        ...prev,
        email: errorMessage.includes("이메일") ? errorMessage : "",
        submit: errorMessage,
      }));
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    router.push("/login");
  };

  const handleEmailCheck = async () => {
    // 이메일 형식 검증
    if (!formData.email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "이메일을 입력해주세요.",
      }));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "올바른 이메일 형식이 아닙니다.",
      }));
      return;
    }

    setEmailCheckStatus("checking");
    setErrors((prev) => ({ ...prev, email: "" }));

    try {
      const response = await userApi.checkEmail(formData.email);

      if (response.available) {
        setEmailCheckStatus("available");
      } else {
        setEmailCheckStatus("duplicate");
        setErrors((prev) => ({
          ...prev,
          email: "이미 사용 중인 이메일입니다.",
        }));
      }
    } catch (error) {
      setEmailCheckStatus("idle");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "중복 확인 중 오류가 발생했습니다.";
      setErrors((prev) => ({
        ...prev,
        email: errorMessage,
      }));
    }
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit}>
        {/* Email - Full Width */}
        <FormGroup>
          <Label htmlFor="email">이메일 *</Label>
          <EmailInputWrapper>
            <EmailInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
            <CheckButton
              type="button"
              onClick={handleEmailCheck}
              disabled={emailCheckStatus === "checking"}
              isChecking={emailCheckStatus === "checking"}
            >
              {emailCheckStatus === "checking" ? "확인 중..." : "중복 확인"}
            </CheckButton>
          </EmailInputWrapper>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          {emailCheckStatus === "available" && (
            <CheckStatusMessage status="available">
              사용 가능한 이메일입니다.
            </CheckStatusMessage>
          )}
          {emailCheckStatus === "duplicate" && (
            <CheckStatusMessage status="duplicate">
              이미 사용 중인 이메일입니다.
            </CheckStatusMessage>
          )}
        </FormGroup>

        {/* Password Row - 2 columns */}
        <FormRow>
          <FormColumn>
            <Label htmlFor="password">비밀번호 *</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="최소 8자 이상"
              required
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            {!errors.password && passwordValid !== null && (
              <PasswordValidMessage isValid={passwordValid}>
                {passwordValid
                  ? "✓ 사용 가능한 비밀번호입니다."
                  : "✗ 비밀번호는 최소 8자 이상이어야 합니다."}
              </PasswordValidMessage>
            )}
          </FormColumn>

          <FormColumn>
            <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
            {!errors.confirmPassword && passwordMatch !== null && (
              <PasswordMatchMessage isMatch={passwordMatch}>
                {passwordMatch
                  ? "✓ 비밀번호가 일치합니다."
                  : "✗ 비밀번호가 일치하지 않습니다."}
              </PasswordMatchMessage>
            )}
          </FormColumn>
        </FormRow>

        {/* Name & Phone Row - 2 columns */}
        <FormRow>
          <FormColumn>
            <Label htmlFor="name">이름 *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormColumn>

          <FormColumn>
            <Label htmlFor="phone">연락처 *</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              maxLength={13}
              required
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormColumn>
        </FormRow>

        {/* Address & Card Row - 2 columns */}
        <FormRow>
          <FormColumn>
            <Label htmlFor="address">주소 *</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="서울시 강남구 테헤란로 123"
              required
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormColumn>

          <FormColumn>
            <Label htmlFor="cardNumber">신용카드 번호</Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <ErrorMessage>{errors.cardNumber}</ErrorMessage>
            )}
          </FormColumn>
        </FormRow>

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit" variant="primary">
            가입하기
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
}
