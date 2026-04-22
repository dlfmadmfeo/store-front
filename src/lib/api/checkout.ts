import type {
  CheckoutQuoteRequest,
  CheckoutQuoteResponse,
  CheckoutSubmitRequest,
  CheckoutSubmitResponse,
} from "@/lib/types/checkout";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? `API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchCheckoutQuote(
  payload: CheckoutQuoteRequest,
): Promise<CheckoutQuoteResponse> {
  const response = await fetch("/api/checkout/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  return parseJson<CheckoutQuoteResponse>(response);
}

export async function submitCheckout(
  payload: CheckoutSubmitRequest,
): Promise<CheckoutSubmitResponse> {
  const response = await fetch("/api/checkout/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<CheckoutSubmitResponse>(response);
}
