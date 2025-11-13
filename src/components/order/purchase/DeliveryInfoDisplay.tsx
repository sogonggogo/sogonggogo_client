"use client";

import styled from "@emotion/styled";
import { MapPin, Calendar, Clock, CreditCard } from "lucide-react";

const InfoGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accentAlpha70};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
`;

interface DeliveryInfo {
  address: string;
  date: string;
  time: string;
  cardNumber: string;
}

interface DeliveryInfoDisplayProps {
  deliveryInfo: DeliveryInfo;
}

export default function DeliveryInfoDisplay({
  deliveryInfo,
}: DeliveryInfoDisplayProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.length !== 16) return cardNumber;
    return `${cleaned.slice(0, 4)} **** **** ${cleaned.slice(12, 16)}`;
  };

  return (
    <InfoGrid>
      <InfoRow>
        <IconWrapper>
          <MapPin size={24} />
        </IconWrapper>
        <InfoContent>
          <InfoLabel>배달 주소</InfoLabel>
          <InfoValue>{deliveryInfo.address}</InfoValue>
        </InfoContent>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <Calendar size={24} />
        </IconWrapper>
        <InfoContent>
          <InfoLabel>도착 날짜</InfoLabel>
          <InfoValue>{formatDate(deliveryInfo.date)}</InfoValue>
        </InfoContent>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <Clock size={24} />
        </IconWrapper>
        <InfoContent>
          <InfoLabel>도착 시각</InfoLabel>
          <InfoValue>{deliveryInfo.time}</InfoValue>
        </InfoContent>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <CreditCard size={24} />
        </IconWrapper>
        <InfoContent>
          <InfoLabel>결제 카드</InfoLabel>
          <InfoValue>{maskCardNumber(deliveryInfo.cardNumber)}</InfoValue>
        </InfoContent>
      </InfoRow>
    </InfoGrid>
  );
}

