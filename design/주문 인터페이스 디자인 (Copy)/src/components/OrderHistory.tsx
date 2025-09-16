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
    quantity: 2
  },
  {
    id: 2,
    menuName: "프렌치 디너",
    price: "75,000원",
    date: "2024.09.08",
    status: "완료",
    quantity: 1
  },
  {
    id: 3,
    menuName: "샴페인 축제 디너",
    price: "120,000원",
    date: "2024.09.05",
    status: "완료",
    quantity: 1
  },
  {
    id: 4,
    menuName: "잉글리시 디너",
    price: "65,000원",
    date: "2024.09.03",
    status: "완료",
    quantity: 2
  },
  {
    id: 5,
    menuName: "프렌치 디너",
    price: "75,000원",
    date: "2024.08.28",
    status: "완료",
    quantity: 1
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "완료":
      return "bg-green-100 text-green-800";
    case "준비중":
      return "bg-yellow-100 text-yellow-800";
    case "배달중":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function OrderHistory() {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📋</span>
          이전 주문 내역
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-3 p-6">
            {previousOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{order.menuName}</h4>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{order.price}</span>
                    <span>수량: {order.quantity}개</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  재주문
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 border-t">
          <button className="w-full py-2 text-center text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors">
            전체 주문 내역 보기
          </button>
        </div>
      </CardContent>
    </Card>
  );
}