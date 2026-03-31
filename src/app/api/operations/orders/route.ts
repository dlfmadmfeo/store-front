import { NextResponse } from "next/server";
import { myShoppingOrders } from "@/domains/myshopping/mockData";
import type { MyShoppingOrder, OrderStatus } from "@/domains/myshopping/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") ?? "").trim().toLowerCase();
  const status = searchParams.get("status") ?? "all";
  const channel = searchParams.get("channel") ?? "all";

  await delay(180);

  let items = myShoppingOrders;

  if (status !== "all") {
    items = items.filter((item) => item.status === status);
  }

  if (channel !== "all") {
    items = items.filter((item) => item.channel === channel);
  }

  if (query) {
    items = items.filter((item) =>
      [item.title, item.orderNumber, item.customerName].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }

  return NextResponse.json(items);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    orderId: string;
    status: OrderStatus;
    managementMemo: string;
  };

  await delay(180);

  const target = myShoppingOrders.find((order) => order.id === body.orderId);

  if (!target) {
    return NextResponse.json({ message: "주문을 찾을 수 없습니다." }, { status: 404 });
  }

  const updated: MyShoppingOrder = {
    ...target,
    status: body.status,
    managementMemo: body.managementMemo,
  };

  return NextResponse.json(updated);
}
