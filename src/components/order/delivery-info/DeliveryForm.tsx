"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { MapPin, Calendar, Clock, CreditCard } from "lucide-react";
import type { DeliveryInfo } from "@/utils/deliveryStorage";

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

const DateTimeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
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
