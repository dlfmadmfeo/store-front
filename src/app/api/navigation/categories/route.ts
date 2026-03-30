import { NextResponse } from "next/server";
import { mockCategoryMenuData } from "@/lib/mock/navigation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(150);
  return NextResponse.json(mockCategoryMenuData);
}
