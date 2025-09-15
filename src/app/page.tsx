import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-8">
        Mr-Daebak에 오신 것을 환영합니다!
      </h1>
      <p className="text-lg text-gray-600 mb-8">홈페이지입니다.</p>

      <div className="flex gap-4">
        <Link
          href="/main"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          메인 페이지로 이동
        </Link>
      </div>
    </main>
  );
}
