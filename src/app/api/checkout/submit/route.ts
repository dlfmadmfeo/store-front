import { NextResponse } from "next/server";
import { submitMockCheckout } from "@/lib/mock/checkout";
import type { CheckoutSubmitRequest } from "@/lib/types/checkout";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const payload = (await request.json()) as CheckoutSubmitRequest;

  await delay(650);

  try {
    const result = await submitMockCheckout(payload);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "결제 요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
