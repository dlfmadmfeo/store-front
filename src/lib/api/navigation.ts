import { unstable_cache } from "next/cache";
import { createMockSearchResults, mockCategoryMenuData, mockSearchPanelData } from "@/lib/mock/navigation";
import type { CategoryMenuData, SearchPanelData, SearchResultsResponse } from "@/lib/types/navigation";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchSearchPanelData(): Promise<SearchPanelData> {
  const response = await fetch("/api/navigation/search-panel", {
    method: "GET",
    cache: "force-cache",
  });

  return parseJson<SearchPanelData>(response);
}

export async function fetchCategoryMenuData(): Promise<CategoryMenuData> {
  const response = await fetch("/api/navigation/categories", {
    method: "GET",
    cache: "force-cache",
  });

  return parseJson<CategoryMenuData>(response);
}

export async function fetchSearchResults(query: string): Promise<SearchResultsResponse> {
  const params = new URLSearchParams({ query });
  const response = await fetch(`/api/search?${params.toString()}`, {
    method: "GET",
    next: { revalidate: 300 },
  });

  return parseJson<SearchResultsResponse>(response);
}

export const getSearchPanelData = unstable_cache(
  async () => mockSearchPanelData,
  ["search-panel-data"],
  { revalidate: 3600 },
);

export const getCategoryMenuData = unstable_cache(
  async () => mockCategoryMenuData,
  ["category-menu-data"],
  { revalidate: 3600 },
);

export async function getSearchResultsData(query: string) {
  return createMockSearchResults(query);
}
