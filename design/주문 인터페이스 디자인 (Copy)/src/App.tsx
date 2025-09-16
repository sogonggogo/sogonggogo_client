import { Header } from "./components/Header";
import { MenuCarousel } from "./components/MenuCarousel";
import { OrderHistory } from "./components/OrderHistory";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex gap-8 p-6 max-w-7xl mx-auto">
        <div className="flex-1">
          <MenuCarousel />
        </div>
        <div className="w-96 flex-shrink-0">
          <OrderHistory />
        </div>
      </main>
    </div>
  );
}