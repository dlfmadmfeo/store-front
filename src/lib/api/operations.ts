import type { MyShoppingOrder, OrderStatus } from "@/domains/myshopping/types";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchOperationOrders(params: {
  query?: string;
  status?: string;
  channel?: string;
}): Promise<MyShoppingOrder[]> {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.set("query", params.query);
  if (params.status) searchParams.set("status", params.status);
  if (params.channel) searchParams.set("channel", params.channel);

  const response = await fetch(`/api/operations/orders?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  return parseJson<MyShoppingOrder[]>(response);
}

export async function updateOperationOrder(payload: {
  orderId: string;
  status: OrderStatus;
  managementMemo: string;
}): Promise<MyShoppingOrder> {
  const response = await fetch("/api/operations/orders", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<MyShoppingOrder>(response);
}
