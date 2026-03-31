import { mockTodayEvents } from "@/lib/mock/home";
import type { PromoItem } from "@/lib/types/home";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchTodayEvents(): Promise<PromoItem[]> {
  const response = await fetch("/api/home/today-events", {
    method: "GET",
    cache: "no-store",
  });

  return parseJson<PromoItem[]>(response);
}

export async function getTodayEventsData(): Promise<PromoItem[]> {
  if (typeof window === "undefined") {
    return mockTodayEvents;
  }

  return fetchTodayEvents();
}
