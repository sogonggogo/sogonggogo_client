import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-orange-50 to-red-50 py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          최고의 디너 경험을 
          <br />
          <span className="text-orange-600">미스터 대박</span>에서
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          정성스럽게 준비된 프리미엄 디너 코스로 특별한 순간을 만들어드립니다.
          로맨틱한 분위기부터 축제 같은 디너까지, 모든 순간이 대박이 될 거예요.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="px-8 py-3">
            메뉴 보기
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3">
            예약하기
          </Button>
        </div>
      </div>
    </section>
  );
}