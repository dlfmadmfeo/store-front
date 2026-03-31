import { NextResponse } from "next/server";
import { createMockSearchResults } from "@/lib/mock/navigation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";

  await delay(180);

  return NextResponse.json(createMockSearchResults(query), {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
