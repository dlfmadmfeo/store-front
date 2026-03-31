import type { OrderFilter, OrderStatus } from "@/domains/myshopping/types";

export type MyShoppingOrderLinkParams = {
  entry?: "app" | "web";
  filter?: OrderFilter;
  orderId?: string;
  query?: string;
  source?: "operations" | "myshopping";
};

export function buildMyShoppingOrderLink({
  entry = "web",
  filter,
  orderId,
  query,
  source,
}: MyShoppingOrderLinkParams = {}) {
  const searchParams = new URLSearchParams();

  if (entry !== "web") {
    searchParams.set("entry", entry);
  }

  if (filter && filter !== "all") {
    searchParams.set("filter", filter);
  }

  if (orderId) {
    searchParams.set("orderId", orderId);
  }

  if (query) {
    searchParams.set("q", query);
  }

  if (source) {
    searchParams.set("source", source);
  }

  const queryString = searchParams.toString();
  return queryString ? `/myshop/orders?${queryString}` : "/myshop/orders";
}

export function getOrderFilterFromStatus(status: OrderStatus): OrderFilter {
  if (status === "구매확정완료") {
    return "completed";
  }

  if (status === "배송준비중" || status === "배송중") {
    return "shipping";
  }

  return "issue";
}
