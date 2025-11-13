"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import DeliveryForm from "@/components/order/delivery-info/DeliveryForm";
import { saveDeliveryInfo, DeliveryInfo } from "@/utils/deliveryStorage";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.headerHeight};
  padding-left: ${({ theme }) => theme.spacing.container};
  padding-right: ${({ theme }) => theme.spacing.container};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.miwon};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function DeliveryInfoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (deliveryInfo: DeliveryInfo) => {
    setIsSubmitting(true);
    
    // Save delivery info to localStorage
    saveDeliveryInfo(deliveryInfo);
    
    // Redirect to purchase page
    router.push("/purchase");
  };

  const handleCancel = () => {
    router.push("/change-option");
  };

  return (
    <Container>
      <Main>
        <ContentWrapper>
          <PageTitle>
            <ShoppingBag size={48} strokeWidth={2} />
            배달 정보 입력
          </PageTitle>

          <DeliveryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </ContentWrapper>
      </Main>
    </Container>
  );
}

