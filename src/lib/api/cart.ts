import type { CartProduct } from "@/lib/types/cart";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchCartProducts(): Promise<CartProduct[]> {
  const response = await fetch("/api/cart", {
    method: "GET",
    cache: "no-store",
  });

  return parseJson<CartProduct[]>(response);
}
