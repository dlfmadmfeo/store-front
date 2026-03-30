"use client";

import { useEffect, useState } from "react";
import { fetchSearchPanelData } from "@/lib/api/navigation";
import type { SearchPanelData } from "@/lib/types/navigation";

export function useSearchPanelData() {
  const [data, setData] = useState<SearchPanelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetchSearchPanelData();
        if (mounted) {
          setData(response);
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

  return { data, isLoading };
}
