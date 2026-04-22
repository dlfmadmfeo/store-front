"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCheckoutQuote, submitCheckout } from "@/lib/api/checkout";
import type {
  CheckoutFlowStatus,
  CheckoutQuoteResponse,
  CheckoutSubmitResponse,
  PaymentMethodId,
} from "@/lib/types/checkout";
import type { CartProduct } from "@/lib/types/cart";
import type { ShippingAddress } from "@/store/useAddressStore";

function createCheckoutItems(products: CartProduct[]) {
  return products.flatMap((product) =>
    product.options.map((option) => ({
      productId: product.id,
      optionId: option.id,
      count: option.count,
    })),
  );
}

export function useCheckoutData({
  selectedProducts,
  address,
  useAllPoints,
  selectedPaymentMethod,
  source,
  agreed,
}: {
  selectedProducts: CartProduct[];
  address: ShippingAddress | null;
  useAllPoints: boolean;
  selectedPaymentMethod: PaymentMethodId;
  source: "web" | "app";
  agreed: boolean;
}) {
  const items = useMemo(() => createCheckoutItems(selectedProducts), [selectedProducts]);
  const [quote, setQuote] = useState<CheckoutQuoteResponse | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<CheckoutSubmitResponse | null>(null);
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const [flowStatus, setFlowStatus] = useState<CheckoutFlowStatus>("idle");

  useEffect(() => {
    let cancelled = false;

    async function loadQuote() {
      setIsLoadingQuote(true);
      setQuoteError(null);
      setFlowStatus("quoting");

      try {
        const nextQuote = await fetchCheckoutQuote({
          items,
          useAllPoints,
          selectedAddressId: address?.id ?? null,
        });

        if (!cancelled) {
          setQuote(nextQuote);
          setFlowStatus("ready");
        }
      } catch (error) {
        if (!cancelled) {
          setQuote(null);
          setQuoteError(
            error instanceof Error
              ? error.message
              : "주문 금액을 계산하지 못했습니다. 잠시 후 다시 시도해 주세요.",
          );
          setFlowStatus("quote-error");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingQuote(false);
        }
      }
    }

    void loadQuote();

    return () => {
      cancelled = true;
    };
  }, [address?.id, items, useAllPoints]);

  const reloadQuote = async () => {
    setIsLoadingQuote(true);
    setQuoteError(null);
    setFlowStatus("quoting");

    try {
      const nextQuote = await fetchCheckoutQuote({
        items,
        useAllPoints,
        selectedAddressId: address?.id ?? null,
      });
      setQuote(nextQuote);
      setFlowStatus("ready");
    } catch (error) {
      setQuote(null);
      setQuoteError(
        error instanceof Error
          ? error.message
          : "주문 금액을 계산하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      );
      setFlowStatus("quote-error");
    } finally {
      setIsLoadingQuote(false);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setFlowStatus("submitting");

    try {
      const result = await submitCheckout({
        requestId,
        items,
        selectedAddressId: address?.id ?? null,
        selectedPaymentMethod,
        useAllPoints,
        agreed,
        source,
      });
      setSubmitResult(result);
      setRequestId(crypto.randomUUID());
      setFlowStatus("success");
      return result;
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "결제 요청에 실패했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
      );
      setFlowStatus("submit-error");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    !isLoadingQuote && !quoteError && !!quote && !!items.length && !!address?.id && agreed;

  return {
    quote,
    isLoadingQuote,
    quoteError,
    reloadQuote,
    isSubmitting,
    submitError,
    submitResult,
    submit,
    canSubmit,
    flowStatus,
    requestId,
  };
}
