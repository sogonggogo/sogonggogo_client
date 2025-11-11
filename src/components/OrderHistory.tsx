/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface OrderItem {
  id: number;
  menuName: string;
  price: string;
  date: string;
  status: "완료" | "준비중" | "배달중";
  quantity: number;
}

const previousOrders: OrderItem[] = [
  {
    id: 1,
    menuName: "발렌타인 디너",
    price: "85,000원",
    date: "2024.09.10",
    status: "완료",
    quantity: 2,
  },
  {
    id: 2,
    menuName: "프렌치 디너",
    price: "75,000원",
    date: "2024.09.08",
    status: "완료",
    quantity: 1,
  },
  {
    id: 3,
    menuName: "샴페인 축제 디너",
    price: "120,000원",
    date: "2024.09.05",
    status: "완료",
    quantity: 1,
  },
  {
    id: 4,
    menuName: "잉글리시 디너",
    price: "65,000원",
    date: "2024.09.03",
    status: "완료",
    quantity: 2,
  },
  {
    id: 5,
    menuName: "프렌치 디너",
    price: "75,000원",
    date: "2024.08.28",
    status: "완료",
    quantity: 1,
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "완료":
      return css`
        background-color: #dcfce7;
        color: #166534;
      `;
    case "준비중":
      return css`
        background-color: #fef9c3;
        color: #854d0e;
      `;
    case "배달중":
      return css`
        background-color: #dbeafe;
        color: #1e40af;
      `;
    default:
      return css`
        background-color: #f3f4f6;
        color: #374151;
      `;
  }
}

const cardStyles = css`
  width: 100%;
  height: fit-content;
`;

const cardHeaderStyles = css`
  background-color: #ffffff;
`;

const cardTitleStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #171717;
`;

const cardContentStyles = css`
  padding: 0;
  background-color: #ffffff;
`;

const scrollAreaStyles = css`
  height: 24rem;
`;

const ordersContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
`;

const orderItemStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const orderContentStyles = css`
  flex: 1;
`;

const orderHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const menuNameStyles = css`
  font-weight: 500;
  color: #171717;
`;

const orderDetailsStyles = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #525252;
`;

const reorderButtonStyles = css`
  color: #ea580c;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #c2410c;
  }
`;

const footerStyles = css`
  padding: 1.5rem;
  border-top: 1px solid #e5e5e5;
`;

const viewAllButtonStyles = css`
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  color: #ea580c;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #fff7ed;
  }
`;

export function OrderHistory() {
  return (
    <Card customCss={cardStyles}>
      <CardHeader customCss={cardHeaderStyles}>
        <CardTitle customCss={cardTitleStyles}>
          <span>📋</span>
          이전 주문 내역
        </CardTitle>
      </CardHeader>
      <CardContent customCss={cardContentStyles}>
        <ScrollArea customCss={scrollAreaStyles}>
          <div css={ordersContainerStyles}>
            {previousOrders.map((order) => (
              <div
                key={order.id}
                css={orderItemStyles}
              >
                <div css={orderContentStyles}>
                  <div css={orderHeaderStyles}>
                    <h4 css={menuNameStyles}>
                      {order.menuName}
                    </h4>
                    <Badge
                      customCss={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div css={orderDetailsStyles}>
                    <span>{order.price}</span>
                    <span>수량: {order.quantity}개</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <button css={reorderButtonStyles}>
                  재주문
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div css={footerStyles}>
          <button css={viewAllButtonStyles}>
            전체 주문 내역 보기
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
