"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, CreditCard } from "lucide-react";
import type { DeliveryInfo } from "@/storage/delivery";
import { getUserInfo } from "@/storage/user";
import { userApi } from "@/services/user";
import { getDeliveryInfo } from "@/storage/delivery";

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.blackAlpha25};
  }
`;


const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `
      : `
    background: ${theme.colors.white};
    color: ${theme.colors.accent};
    border: 2px solid ${theme.colors.border};

    &:hover {
      background: ${theme.colors.buttonBackground};
    }
  `}
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily.miwon};
`;

interface DeliveryFormProps {
  onSubmit: (deliveryInfo: DeliveryInfo) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function DeliveryForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: DeliveryFormProps) {
  const [formData, setFormData] = useState<DeliveryInfo>({
    address: "",
    date: "",
    time: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 및 배달 정보 불러오기
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        // 1. 먼저 저장된 배달 정보 확인 (음성 주문에서 저장한 정보)
        const savedDeliveryInfo = getDeliveryInfo();
        
        console.log("📦 DeliveryForm - 저장된 배달 정보:", savedDeliveryInfo);
        console.log("📅 DeliveryForm - 저장된 날짜 (원본):", savedDeliveryInfo?.date);
        console.log("📅 DeliveryForm - 저장된 날짜 타입:", typeof savedDeliveryInfo?.date);

        // 2. API에서 사용자 정보 가져오기 시도
        const userResponse = await userApi.getMe();

        // 카드 번호 포맷팅 (공백 추가)
        const formattedCardNumber = userResponse?.creditCardNumber
          ? userResponse.creditCardNumber.match(/.{1,4}/g)?.join(" ") || ""
          : "";

        // 3. 날짜 형식 정규화 (YYYY-MM-DD 형식으로 변환)
        let normalizedDate = "";
        if (savedDeliveryInfo?.date) {
          const dateStr = savedDeliveryInfo.date.trim();
          // 이미 YYYY-MM-DD 형식인지 확인
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            normalizedDate = dateStr;
          } else if (dateStr.includes("T")) {
            // ISO 8601 형식: "2025-12-06T00:00:00" → "2025-12-06"
            normalizedDate = dateStr.split("T")[0];
          } else {
            // 다른 형식 시도
            try {
              const date = new Date(dateStr);
              if (!isNaN(date.getTime())) {
                normalizedDate = date.toISOString().split("T")[0];
              }
            } catch (e) {
              console.warn("⚠️ 날짜 파싱 실패:", dateStr, e);
            }
          }
          console.log("📅 DeliveryForm - 정규화된 날짜:", normalizedDate);
        }

        // 4. 저장된 배달 정보가 있으면 우선 사용, 없으면 사용자 정보 사용
        const formDataToSet = {
          address: savedDeliveryInfo?.address || userResponse?.address || "",
          date: normalizedDate, // 정규화된 날짜 사용
          time: savedDeliveryInfo?.time || "",
          cardNumber: savedDeliveryInfo?.cardNumber
            ? savedDeliveryInfo.cardNumber.match(/.{1,4}/g)?.join(" ") ||
              savedDeliveryInfo.cardNumber
            : formattedCardNumber,
        };
        
        console.log("📝 DeliveryForm - 설정할 폼 데이터:", formDataToSet);
        console.log("📅 DeliveryForm - 최종 설정할 날짜:", formDataToSet.date);
        console.log("📅 DeliveryForm - 날짜 길이:", formDataToSet.date.length);
        console.log("📅 DeliveryForm - 날짜가 비어있나?", !formDataToSet.date);
        
        setFormData(formDataToSet);
      } catch {
        // API 실패 시 로컬 스토리지에서 가져오기
        const savedDeliveryInfo = getDeliveryInfo();
        const localUserInfo = getUserInfo();

        // 날짜 정규화
        let normalizedDate = "";
        if (savedDeliveryInfo?.date) {
          const dateStr = savedDeliveryInfo.date.trim();
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            normalizedDate = dateStr;
          } else if (dateStr.includes("T")) {
            normalizedDate = dateStr.split("T")[0];
          } else {
            try {
              const date = new Date(dateStr);
              if (!isNaN(date.getTime())) {
                normalizedDate = date.toISOString().split("T")[0];
              }
            } catch (e) {
              console.warn("⚠️ 날짜 파싱 실패:", dateStr, e);
            }
          }
        }

        if (savedDeliveryInfo || localUserInfo) {
          const formDataToSet = {
            address: savedDeliveryInfo?.address || localUserInfo?.address || "",
            date: normalizedDate,
            time: savedDeliveryInfo?.time || "",
            cardNumber:
              savedDeliveryInfo?.cardNumber || localUserInfo?.cardNumber || "",
          };
          console.log("📝 DeliveryForm (catch) - 설정할 폼 데이터:", formDataToSet);
          setFormData(formDataToSet);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  // Generate time slots (30-minute intervals) between 11:00 and 22:00
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        slots.push(`${hourStr}:${minuteStr}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "");
      const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryInfo> = {};

    if (!formData.address.trim()) {
      newErrors.address = "배달 주소를 입력해주세요.";
    }

    if (!formData.date) {
      newErrors.date = "도착 날짜를 선택해주세요.";
    }

    if (!formData.time) {
      newErrors.time = "도착 시각을 선택해주세요.";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "카드 번호를 입력해주세요.";
    } else {
      const cleaned = formData.cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cleaned)) {
        newErrors.cardNumber = "16자리 카드 번호를 입력해주세요.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <FormContainer>
        <p style={{ textAlign: "center", padding: "2rem" }}>
          사용자 정보를 불러오는 중...
        </p>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <MapPin size={24} />
            배달 주소
          </Label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="예: 서울시 강남구 테헤란로 123"
            disabled={isSubmitting}
          />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            <Calendar size={24} />
            도착 날짜
          </Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            disabled={isSubmitting}
          />
          {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            <Clock size={24} />
            도착 시각
          </Label>
          <Select
            name="time"
            value={formData.time}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">시간을 선택해주세요</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>
          {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            <CreditCard size={24} />
            카드 번호
          </Label>
          <Input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            disabled={isSubmitting}
          />
          {errors.cardNumber && (
            <ErrorMessage>{errors.cardNumber}</ErrorMessage>
          )}
        </FormGroup>

        <ButtonGroup>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "이동중..." : "결제 페이지로 이동"}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}
