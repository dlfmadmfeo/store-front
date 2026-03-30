"use client";

import { useEffect, useState } from "react";
import { fetchCategoryMenuData } from "@/lib/api/navigation";
import type { CategoryMenuData } from "@/lib/types/navigation";

export function useCategoryMenuData() {
  const [data, setData] = useState<CategoryMenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetchCategoryMenuData();
        if (mounted) {
          setData(response);
          setError(null);
        }
      } catch {
        if (mounted) {
          setError("카테고리 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
