import { NextRequest, NextResponse } from "next/server";

const VOICE_API_BASE_URL = "http://uoscholar-server.store/sogong-ai";

async function handler(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // Extract the path after /api/chat/
  // 프론트엔드: /api/chat/start -> 백엔드: /api/chat/start
  // 프론트엔드: /api/chat/message -> 백엔드: /api/chat/message
  // 프론트엔드: /api/chat/reset/{session_id} -> 백엔드: /api/chat/reset/{session_id}
  const apiPath = pathname.replace(/^\/api\/chat/, "/api/chat");

  // Construct the target URL
  const targetUrl = `${VOICE_API_BASE_URL}${apiPath}`;

  try {
    // Prepare headers
    const headers: HeadersInit = {};

    // Forward relevant headers
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    // Prepare request options
    const options: RequestInit = {
      method: request.method,
      headers,
    };

    // Forward body for POST/PUT/PATCH requests
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    // Make the request to the backend
    const response = await fetch(targetUrl, options);

    // Get response body
    const responseBody = await response.text();

    // Create response with same status
    const nextResponse = new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
    });

    // Forward response headers
    response.headers.forEach((value, key) => {
      // Skip headers that shouldn't be forwarded
      if (
        !key.toLowerCase().startsWith("content-encoding") &&
        !key.toLowerCase().startsWith("transfer-encoding")
      ) {
        nextResponse.headers.set(key, value);
      }
    });

    // Set CORS headers
    nextResponse.headers.set("Access-Control-Allow-Origin", "*");
    nextResponse.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    nextResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return nextResponse;
  } catch {
    return NextResponse.json(
      { detail: "Voice API 프록시 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}

export async function PUT(request: NextRequest) {
  return handler(request);
}

export async function PATCH(request: NextRequest) {
  return handler(request);
}

export async function DELETE(request: NextRequest) {
  return handler(request);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
