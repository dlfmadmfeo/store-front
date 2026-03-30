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
    cache: "no-store",
  });

  return parseJson<SearchPanelData>(response);
}

export async function fetchCategoryMenuData(): Promise<CategoryMenuData> {
  const response = await fetch("/api/navigation/categories", {
    method: "GET",
    cache: "no-store",
  });

  return parseJson<CategoryMenuData>(response);
}

export async function fetchSearchResults(query: string): Promise<SearchResultsResponse> {
  const params = new URLSearchParams({ query });
  const response = await fetch(`/api/search?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  return parseJson<SearchResultsResponse>(response);
}
