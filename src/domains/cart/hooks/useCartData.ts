"use client";

import { useEffect, useState } from "react";
import { fetchCartProducts } from "@/lib/api/cart";
import { useCartStore } from "@/store/useCartStore";

export function useCartData() {
  const setProducts = useCartStore((s) => s.setProducts);
  const products = useCartStore((s) => s.products);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const nextProducts = await fetchCartProducts();
        if (mounted) {
          setProducts(nextProducts);
          setError(null);
        }
      } catch {
        if (mounted) {
          setError("\uC7A5\uBC14\uAD6C\uB2C8 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [setProducts]);

  return { products, isLoading, error };
}
