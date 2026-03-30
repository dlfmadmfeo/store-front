"use client";

import { useState } from "react";
import MyShoppingMobileNav from "./MyShoppingMobileNav";
import MyShoppingShell from "./MyShoppingShell";
import {
  MyShoppingCardSkeleton,
  MyShoppingEmptyState,
  MyShoppingErrorState,
} from "./MyShoppingStates";
import { useMyShoppingOrdersData } from "./useMyShoppingData";
import type { OrderFilter } from "./types";

export default function MyShoppingOrders() {
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderFilter>("all");
  const { data, isLoading, error } = useMyShoppingOrdersData(query, filter);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(queryInput);
  }

  const orders = data?.orders ?? [];

  return (
    <MyShoppingShell mobileNavigation={<MyShoppingMobileNav />}>
      <div className="space-y-4">
        <section
          aria-labelledby="orders-heading"
          className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6 md:flex-row md:items-center md:justify-between">
            <h1
              id="orders-heading"
              className="text-[22px] font-bold tracking-[-0.02em] text-gray-950"
            >
              {"\uC8FC\uBB38/\uBC30\uC1A1\uB0B4\uC5ED"}
            </h1>
            <button className="rounded-[8px] border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
              N pay {"\uB0B4\uC5ED"}
            </button>
          </div>

          <div className="space-y-5 px-5 py-5 sm:px-7">
            <form
              className="flex items-center rounded-[12px] bg-[#f4f7fa] px-4 py-3"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="orders-search"
                className="sr-only"
              >
                주문 내역 검색
              </label>
              <input
                id="orders-search"
                value={queryInput}
                onChange={(event) => setQueryInput(event.target.value)}
                placeholder="\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"
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

            <div className="flex gap-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                aria-pressed={filter === "all"}
                className={[
                  "rounded-[999px] px-4 py-2 text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2",
                  filter === "all" ? "bg-[#1f2937] text-white" : "bg-gray-100 text-gray-700",
                ].join(" ")}
                onClick={() => setFilter("all")}
              >
                {"\uC804\uCCB4"}
              </button>
              <button
                type="button"
                aria-pressed={filter === "completed"}
                className={[
                  "rounded-[999px] px-4 py-2 text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2",
                  filter === "completed" ? "bg-[#1f2937] text-white" : "bg-gray-100 text-gray-700",
                ].join(" ")}
                onClick={() => setFilter("completed")}
              >
                {"\uAD6C\uB9E4\uD655\uC815"}
              </button>
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

        {!isLoading && !error && orders.length === 0 ? (
          <MyShoppingEmptyState
            title="조건에 맞는 주문이 없어요"
            description="검색어를 바꾸거나 전체 주문 내역에서 다시 확인해 주세요."
          />
        ) : null}

        {!isLoading && !error
          ? orders.map((order) => (
              <section
                key={order.id}
                aria-label={`${order.status} 주문 카드`}
                className="rounded-[16px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:px-7 sm:py-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[16px] font-bold text-gray-900">{order.status}</div>
                  <button
                    type="button"
                    className="text-[22px] font-light text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
                    aria-label="주문 카드 닫기"
                  >
                    &times;
                  </button>
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
                      {"\uC0C1\uC138\uBCF4\uAE30 >"}
                    </button>
                  </div>

                  <button className="text-left text-[15px] font-medium text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 lg:self-center">
                    {order.sellerActionLabel}
                  </button>
                </div>

                <div className="mt-5 flex flex-col gap-1.5 sm:flex-row">
                  <button className="rounded-[6px] border border-gray-300 px-4 py-3 text-[15px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 sm:flex-1">
                    {"\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30"}
                  </button>
                  <button className="rounded-[6px] border border-gray-300 px-4 py-3 text-[15px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 sm:flex-1">
                    {"\uBC14\uB85C \uAD6C\uB9E4\uD558\uAE30"}
                  </button>
                  <button
                    type="button"
                    className="rounded-[6px] border border-gray-300 px-4 py-3 text-[18px] text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
                    aria-label="주문 추가 메뉴"
                  >
                    ...
                  </button>
                </div>
              </section>
            ))
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
