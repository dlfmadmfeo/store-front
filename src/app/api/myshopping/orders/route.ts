import { NextResponse } from "next/server";
import { myShoppingOrders } from "@/domains/myshopping/mockData";
import type { MyShoppingOrdersData, OrderFilter } from "@/domains/myshopping/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  const filter = (searchParams.get("filter") ?? "all") as OrderFilter;

  await delay(220);

  const normalizedQuery = query.trim().toLowerCase();
  let filtered = myShoppingOrders;

  if (filter === "completed") {
    filtered = filtered.filter((order) => order.status === "구매확정완료");
  }

  if (normalizedQuery) {
    filtered = filtered.filter((order) =>
      [order.title, order.orderedAt, order.status].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }

  const response: MyShoppingOrdersData = {
    orders: filtered,
    totalCount: filtered.length,
    filter,
    query,
  };

  return NextResponse.json(response);
}
