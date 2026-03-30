import { NextResponse } from "next/server";
import { mockCartProducts } from "@/lib/mock/cart";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(180);

  return NextResponse.json(mockCartProducts);
}
