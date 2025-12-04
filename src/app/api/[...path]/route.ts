import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://uoscholar-server.store/sogong-api";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PUT");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  const path = params.path.join("/");
  const url = `${API_BASE_URL}/api/${path}`;

  // 쿼리 파라미터 추가
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  // 요청 헤더 복사
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // 쿠키 전달
  const cookie = request.headers.get("cookie");
  if (cookie) {
    headers["Cookie"] = cookie;
  }

  // 요청 본문 처리
  let body: string | undefined;
  if (method !== "GET" && method !== "DELETE") {
    try {
      const text = await request.text();
      if (text) {
        body = text;
      }
    } catch {
      // 본문이 없는 경우 무시
    }
  }

  try {
    // 백엔드 API 호출
    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
      credentials: "include",
    });

    // 응답 본문 읽기
    const responseText = await response.text();
    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseData = responseText;
    }

    // 응답 생성
    const nextResponse = NextResponse.json(responseData, {
      status: response.status,
      statusText: response.statusText,
    });

    // Set-Cookie 헤더 전달
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.set("Set-Cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
