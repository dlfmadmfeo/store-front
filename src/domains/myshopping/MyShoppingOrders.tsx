"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MyShoppingMobileNav from "./MyShoppingMobileNav";
import MyShoppingShell from "./MyShoppingShell";
import {
  MyShoppingCardSkeleton,
  MyShoppingEmptyState,
  MyShoppingErrorState,
} from "./MyShoppingStates";
import { useMyShoppingOrdersData } from "./useMyShoppingData";
import type { OrderFilter } from "./types";
import { buildMyShoppingOrderLink } from "@/lib/utils/myShoppingDeepLink";

const filterOptions: Array<{ label: string; value: OrderFilter }> = [
  { label: "전체", value: "all" },
  { label: "구매확정", value: "completed" },
  { label: "배송중", value: "shipping" },
  { label: "이슈관리", value: "issue" },
];

export default function MyShoppingOrders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialFilter = (searchParams.get("filter") as OrderFilter | null) ?? "all";
  const entry = searchParams.get("entry");
  const focusOrderId = searchParams.get("orderId");
  const source = searchParams.get("source");
  const isWebview = entry === "app";

  const [queryInput, setQueryInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<OrderFilter>(initialFilter);
  const { data, isLoading, error } = useMyShoppingOrdersData(query, filter);

  useEffect(() => {
    setQueryInput(initialQuery);
    setQuery(initialQuery);
    setFilter(initialFilter);
  }, [initialFilter, initialQuery]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(queryInput);
  }

  const orders = data?.orders ?? [];
  const sortedOrders = useMemo(() => {
    if (!focusOrderId) return orders;
    const focused = orders.find((order) => order.id === focusOrderId);
    if (!focused) return orders;
    return [focused, ...orders.filter((order) => order.id !== focusOrderId)];
  }, [focusOrderId, orders]);

  return (
    <MyShoppingShell
      mobileNavigation={<MyShoppingMobileNav />}
      isWebview={isWebview}
      webviewHeader={
        isWebview ? (
          <div className="rounded-[16px] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (source === "operations") {
                    router.push("/ops/orders");
                    return;
                  }
                  router.push("/myshop");
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[18px] text-gray-700"
                aria-label={source === "operations" ? "운영 화면으로 돌아가기" : "마이쇼핑으로 돌아가기"}
              >
                &#8249;
              </button>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium text-[#0f7a43]">앱 웹뷰 모드</div>
                <div className="truncate text-[15px] font-semibold text-gray-900">주문/배송내역</div>
              </div>
              <Link
                href={buildMyShoppingOrderLink()}
                className="rounded-[10px] border border-gray-200 px-3 py-2 text-[13px] font-medium text-gray-700"
              >
                웹 기본 화면
              </Link>
            </div>
          </div>
        ) : null
      }
    >
      <div className="space-y-4">
        {isWebview ? (
          <section className="rounded-[16px] border border-[#d8f5e3] bg-[#f5fdf8] px-5 py-4 text-[14px] text-[#0f7a43] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            앱 웹뷰로 진입함. 딥링크 파라미터 기준으로 주문 화면을 맞춤 표시 중.
          </section>
        ) : null}

        <section
          aria-labelledby="orders-heading"
          className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6 md:flex-row md:items-center md:justify-between">
            <h1
              id="orders-heading"
              className="text-[22px] font-bold tracking-[-0.02em] text-gray-950"
            >
              주문/배송내역
            </h1>
            <button className="rounded-[8px] border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
              N pay 내역
            </button>
          </div>

          <div className="space-y-5 px-5 py-5 sm:px-7">
            <form
              className="flex items-center rounded-[12px] bg-[#f4f7fa] px-4 py-3"
              onSubmit={handleSubmit}
            >
              <label htmlFor="orders-search" className="sr-only">
                주문 내역 검색
              </label>
              <input
                id="orders-search"
                value={queryInput}
                onChange={(event) => setQueryInput(event.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full bg-transparent text-[15px] text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="rounded-[8px] px-2 py-1 text-[20px] text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
                aria-label="주문 내역 검색"
              >
                &#8981;
              </button>
            </form>

            <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={filter === option.value}
                  className={[
                    "rounded-[999px] px-4 py-2 text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2",
                    filter === option.value ? "bg-[#1f2937] text-white" : "bg-gray-100 text-gray-700",
                  ].join(" ")}
                  onClick={() => setFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {error ? <MyShoppingErrorState message={error} /> : null}

        {isLoading ? (
          <div className="space-y-4">
            <MyShoppingCardSkeleton lines={4} />
            <MyShoppingCardSkeleton lines={4} />
          </div>
        ) : null}

        {!isLoading && !error && sortedOrders.length === 0 ? (
          <MyShoppingEmptyState
            title="조건에 맞는 주문이 없습니다"
            description="검색어를 바꾸거나 전체 주문 내역에서 다시 확인해 주세요."
          />
        ) : null}

        {!isLoading && !error
          ? sortedOrders.map((order) => {
              const isFocused = focusOrderId === order.id;

              return (
                <section
                  key={order.id}
                  aria-label={`${order.status} 주문 카드`}
                  className={[
                    "rounded-[16px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:px-7 sm:py-6",
                    isFocused ? "ring-2 ring-[#09aa5c]" : "",
                  ].join(" ")}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-[16px] font-bold text-gray-900">{order.status}</div>
                      <div className="mt-1 text-[13px] text-gray-500">{order.orderNumber}</div>
                    </div>
                    <button
                      type="button"
                      className="text-[22px] font-light text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
                      aria-label="주문 카드 닫기"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2 text-[12px] text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1">
                      {order.channel === "app" ? "앱 웹뷰 주문" : "웹 주문"}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1">{order.paymentMethod}</span>
                  </div>

                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div
                      aria-hidden="true"
                      className={`h-[98px] w-full rounded-[10px] bg-gradient-to-br sm:w-[102px] lg:shrink-0 ${order.imageClass}`}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] text-gray-400">{order.orderedAt}</div>
                      <div className="mt-1 line-clamp-2 text-[15px] leading-6 text-gray-800">
                        {order.title}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-[18px] font-bold text-gray-950">{order.priceLabel}</span>
                        <span className="rounded-[999px] bg-[#00c73c] px-2 py-0.5 text-[12px] font-semibold text-white">
                          N pay
                        </span>
                      </div>
                      <button className="mt-1 text-[14px] font-medium text-[#09a561] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
                        상세보기 &gt;
                      </button>
                    </div>

                    <button className="text-left text-[15px] font-medium text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 lg:self-center">
                      {order.sellerActionLabel}
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-1.5 sm:flex-row">
                    <button className="rounded-[6px] border border-gray-300 px-4 py-3 text-[15px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 sm:flex-1">
                      장바구니 담기
                    </button>
                    <button className="rounded-[6px] border border-gray-300 px-4 py-3 text-[15px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 sm:flex-1">
                      바로 구매하기
                    </button>
                    <button
                      type="button"
                      className="rounded-[6px] border border-gray-300 px-4 py-3 text-[18px] text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
                      aria-label="주문 추가 메뉴"
                    >
                      ...
                    </button>
                  </div>

                  {!isWebview ? (
                    <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
                      <Link
                        href={buildMyShoppingOrderLink({
                          entry: "app",
                          filter,
                          orderId: order.id,
                          source: "myshopping",
                        })}
                        className="inline-flex rounded-[10px] border border-[#bfdbfe] bg-[#f7faff] px-4 py-2 text-[13px] font-medium text-[#1d4ed8]"
                      >
                        앱 웹뷰 진입 링크로 보기
                      </Link>
                    </div>
                  ) : null}
                </section>
              );
            })
          : null}

        <section className="rounded-[16px] bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-gray-200 text-xl text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
              aria-label="이전 페이지"
            >
              &#8249;
            </button>
            <div className="text-[18px] font-semibold text-gray-900">{data?.totalCount ? "1" : "-"}</div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-gray-200 text-xl text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
              aria-label="다음 페이지"
            >
              &#8250;
            </button>
          </div>
        </section>
      </div>
    </MyShoppingShell>
  );
}
