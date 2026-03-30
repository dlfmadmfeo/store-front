import { NextResponse } from "next/server";
import { mockSignupSuccessResponse } from "@/lib/mock/signup";
import type { SignupRequest, SignupResponse } from "@/lib/types/signup";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const body = (await request.json()) as SignupRequest;

  await delay(320);

  const requiredFields = [body.userId, body.password, body.name, body.birthDate, body.phone];
  const isValid = requiredFields.every((value) => value.trim().length > 0);

  const response: SignupResponse = isValid
    ? mockSignupSuccessResponse
    : {
        success: false,
        message: "필수 정보를 모두 입력해 주세요.",
      };

  return NextResponse.json(response);
}
