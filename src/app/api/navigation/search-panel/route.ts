import { NextResponse } from "next/server";
import { mockSearchPanelData } from "@/lib/mock/navigation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(150);
  return NextResponse.json(mockSearchPanelData, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
