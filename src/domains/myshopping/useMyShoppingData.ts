"use client";

import { useEffect, useState } from "react";
import { fetchMyShoppingHomeData, fetchMyShoppingOrders } from "./myShoppingApi";
import type { MyShoppingHomeData, MyShoppingOrdersData, OrderFilter } from "./types";

type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useMyShoppingHomeData() {
  const [state, setState] = useState<AsyncState<MyShoppingHomeData>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchMyShoppingHomeData();
        if (mounted) {
          setState({ data, isLoading: false, error: null });
        }
      } catch {
        if (mounted) {
          setState({
            data: null,
            isLoading: false,
            error: "\uB9C8\uC774\uC1FC\uD551 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",
          });
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

export function useMyShoppingOrdersData(query: string, filter: OrderFilter) {
  const [state, setState] = useState<AsyncState<MyShoppingOrdersData>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      setState((current) => ({
        data: current.data,
        isLoading: true,
        error: null,
      }));

      try {
        const data = await fetchMyShoppingOrders({ query, filter });
        if (mounted) {
          setState({ data, isLoading: false, error: null });
        }
      } catch {
        if (mounted) {
          setState({
            data: null,
            isLoading: false,
            error: "\uC8FC\uBB38 \uB0B4\uC5ED\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",
          });
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [query, filter]);

  return state;
}
