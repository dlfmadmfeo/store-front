import { NextResponse } from "next/server";
import { calculateCheckoutQuote } from "@/lib/mock/checkout";
import type { CheckoutQuoteRequest } from "@/lib/types/checkout";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const payload = (await request.json()) as CheckoutQuoteRequest;

  await delay(220);

  return NextResponse.json(calculateCheckoutQuote(payload.items, payload.useAllPoints));
}
