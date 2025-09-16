import { Button } from "./ui/button";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="w-full border-b bg-white px-6 py-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold text-orange-600">미스터 대박</h1>
            <p className="text-base text-gray-600 -mt-1">디너 서비스</p>
          </div>
        </div>
        <Button variant="outline" className="ml-auto">
          로그인
        </Button>
      </div>
    </header>
  );
}
