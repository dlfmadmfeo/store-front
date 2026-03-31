import { NextResponse } from "next/server";
import { myShoppingHomeData } from "@/domains/myshopping/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(220);

  return NextResponse.json(myShoppingHomeData, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
