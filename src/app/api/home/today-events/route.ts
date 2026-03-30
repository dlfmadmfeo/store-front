import { NextResponse } from "next/server";
import { mockTodayEvents } from "@/lib/mock/home";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(180);

  return NextResponse.json(mockTodayEvents);
}
