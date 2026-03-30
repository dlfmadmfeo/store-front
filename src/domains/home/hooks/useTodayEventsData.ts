"use client";

import { useEffect, useState } from "react";
import { fetchTodayEvents } from "@/lib/api/home";
import type { PromoItem } from "@/lib/types/home";

export function useTodayEventsData() {
  const [items, setItems] = useState<PromoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const nextItems = await fetchTodayEvents();
        if (mounted) {
          setItems(nextItems);
          setError(null);
        }
      } catch {
        if (mounted) {
          setError("\uC624\uB298 \uC774\uBCA4\uD2B8 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
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
  }, []);

  return { items, isLoading, error };
}
