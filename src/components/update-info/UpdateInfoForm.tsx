"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo, saveUserInfo } from "@/utils/userStorage";
import { userApi } from "@/services/userApi";

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

export default function UpdateInfoForm() {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load current user info from API
    const loadUserInfo = async () => {
      try {
        const userResponse = await userApi.getMe();
        setFormData({
          email: userResponse.email || "",
          password: "",
          confirmPassword: "",
          name: userResponse.name || "",
          phone: userResponse.phone || "",
          address: userResponse.address || "",
          cardNumber: userResponse.creditCardNumber || "",
        });
      } catch (error) {
        // API 실패 시 로컬 스토리지에서 로드
        const userInfo = getUserInfo();
        if (userInfo) {
          setFormData({
            email: userInfo.email || "",
            password: "",
            confirmPassword: "",
            name: userInfo.name || "",
            phone: userInfo.phone || "",
            address: userInfo.address || "",
            cardNumber: userInfo.cardNumber || "",
          });
        }
      }
    };

    loadUserInfo();
  }, []);

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
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "주소를 입력해주세요.";
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }
    }

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

    setIsLoading(true);

    try {
      // API 호출 - 변경된 필드만 전송
      const updateData: any = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
      };

      // 카드 번호가 있으면 추가 (공백 제거)
      if (formData.cardNumber && formData.cardNumber.trim()) {
        updateData.creditCardNumber = formData.cardNumber.replace(/\s/g, "");
      }

      // 비밀번호가 입력되었으면 추가
      if (formData.password) {
        updateData.password = formData.password;
      }

      const userResponse = await userApi.updateMe(updateData);

      // 로컬 스토리지 업데이트
      const currentUser = getUserInfo();
      const updatedUser = {
        ...currentUser,
        email: userResponse.email,
        name: userResponse.name,
        phone: userResponse.phone,
        address: userResponse.address,
        cardNumber: userResponse.creditCardNumber,
        isRegularCustomer: userResponse.isRegularCustomer,
      };

      // 비밀번호가 변경되었으면 업데이트
      if (formData.password) {
        updatedUser.password = formData.password;
      }

      saveUserInfo(updatedUser);
      alert("정보가 수정되었습니다!");
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "정보 수정 중 오류가 발생했습니다.";
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
      alert(errorMessage);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit}>
        {/* Email - Full Width */}
        <FormGroup>
          <Label htmlFor="email">이메일 (변경 불가)</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
          />
        </FormGroup>

        {/* Password Row - 2 columns */}
        <FormRow>
          <FormColumn>
            <Label htmlFor="password">비밀번호 (변경 시에만 입력)</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="새 비밀번호 (선택사항)"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormColumn>

          <FormColumn>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </FormColumn>
        </FormRow>

        {/* Name & Phone Row - 2 columns */}
        <FormRow>
          <FormColumn>
            <Label htmlFor="name">이름</Label>
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
            <Label htmlFor="phone">연락처</Label>
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
            <Label htmlFor="address">주소</Label>
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
          <Button type="button" onClick={handleCancel} disabled={isLoading}>
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "수정 중..." : "수정하기"}
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
}
