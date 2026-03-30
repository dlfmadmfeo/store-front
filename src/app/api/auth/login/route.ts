import { NextResponse } from "next/server";
import { mockAdminLoginResponse } from "@/lib/mock/auth";
import type { LoginRequest, LoginResponse } from "@/lib/types/auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequest;

  await delay(300);

  const response: LoginResponse =
    body.userId === "admin" && body.password === "0000"
      ? mockAdminLoginResponse
      : {
          success: false,
          message: "아이디 또는 비밀번호가 올바르지 않습니다.",
          payload: null,
        };

  return NextResponse.json(response);
}
