"use client";

import { useEffect, useState } from "react";
import { fetchSearchResults } from "@/lib/api/navigation";
import type { SearchResultsResponse } from "@/lib/types/navigation";

export function useSearchResults(query: string) {
  const [data, setData] = useState<SearchResultsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);

      try {
        const response = await fetchSearchResults(query);
        if (mounted) {
          setData(response);
          setError(null);
        }
      } catch {
        if (mounted) {
          setError("검색 결과를 불러오지 못했습니다.");
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
  }, [query]);

  return { data, isLoading, error };
}
