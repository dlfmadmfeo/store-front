import { unstable_cache } from "next/cache";
import { myShoppingHomeData } from "@/domains/myshopping/mockData";
import type { MyShoppingHomeData, MyShoppingOrdersData, OrderFilter } from "@/domains/myshopping/types";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchMyShoppingHomeData(): Promise<MyShoppingHomeData> {
  const response = await fetch("/api/myshopping/home", {
    method: "GET",
    cache: "force-cache",
  });

  return parseJson<MyShoppingHomeData>(response);
}

export async function fetchMyShoppingOrders({
  query = "",
  filter = "all",
}: {
  query?: string;
  filter?: OrderFilter;
}): Promise<MyShoppingOrdersData> {
  const params = new URLSearchParams({
    query,
    filter,
  });

  const response = await fetch(`/api/myshopping/orders?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  return parseJson<MyShoppingOrdersData>(response);
}

export const getMyShoppingHomeData = unstable_cache(
  async () => myShoppingHomeData,
  ["myshopping-home-data"],
  { revalidate: 3600 },
);
