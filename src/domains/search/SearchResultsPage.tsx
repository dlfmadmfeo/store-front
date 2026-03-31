"use client";

import Link from "next/link";
import { InlineEmptyState, InlineErrorState, SectionSkeleton } from "@/components/common/SectionSkeleton";
import { useSearchResults } from "@/domains/search/hooks/useSearchResults";

export default function SearchResultsPage({ query }: { query: string }) {
  const { data, isLoading, error } = useSearchResults(query);

  return (
    <div className="bg-[#f4f7fb] px-3 py-5 sm:px-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-[1280px]">
        <section className="rounded-[18px] bg-white px-4 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6">
          <p className="text-[13px] font-medium text-[#5f6672]">통합검색</p>
          <h1 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-[#111827] sm:text-[28px] md:text-[32px]">
            {query ? `"${query}" 검색 결과` : "추천 검색 결과"}
          </h1>
          <p className="mt-3 text-[14px] text-[#6b7280] sm:text-[15px]">
            상품, 서비스, 카테고리 결과를 한 화면에서 빠르게 확인할 수 있도록 구성했습니다.
          </p>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            {isLoading ? (
              <>
                <SectionSkeleton lines={4} titleWidth="w-40" />
                <SectionSkeleton lines={4} titleWidth="w-32" />
              </>
            ) : error ? (
              <InlineErrorState
                title="검색 결과를 불러오지 못했습니다"
                description="네트워크 상태를 확인한 뒤 다시 시도해 주세요."
              />
            ) : !data || data.items.length === 0 ? (
              <InlineEmptyState
                title="검색 결과가 없습니다"
                description="다른 검색어를 입력하거나 추천 키워드를 확인해 보세요."
              />
            ) : (
              <>
                <section className="rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-[18px] font-bold text-[#111827] sm:text-[20px]">전체 {data.totalCount}건</h2>
                    <span className="text-[13px] text-[#6b7280]">정확도순</span>
                  </div>
                </section>

                {data.items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-6 sm:py-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div
                        className={`h-[160px] rounded-[16px] bg-gradient-to-br ${item.imageAccent} sm:h-[140px] sm:w-[160px]`}
                        aria-hidden="true"
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[12px] font-medium text-[#6b7280]">{item.category}</span>
                            {item.badge ? (
                              <span className="rounded-full bg-[#fff2f2] px-2.5 py-1 text-[12px] font-semibold text-[#ef4444]">
                                {item.badge}
                              </span>
                            ) : null}
                          </div>
                          <h3 className="mt-2 text-[18px] font-semibold text-[#111827] sm:text-[20px]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-[14px] text-[#6b7280] sm:text-[15px]">{item.seller}</p>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="text-[22px] font-bold text-[#111827] sm:text-[24px]">
                              {item.priceLabel}
                            </div>
                            <div className="mt-1 text-[13px] text-[#10b981]">{item.deliveryLabel}</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:flex">
                            <button
                              type="button"
                              className="rounded-[12px] border border-[#d5dbe3] px-4 py-3 text-[14px] font-medium text-[#374151]"
                            >
                              장바구니 담기
                            </button>
                            <button
                              type="button"
                              className="rounded-[12px] bg-[#0f172a] px-4 py-3 text-[14px] font-semibold text-white"
                            >
                              바로 보기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </>
            )}
          </div>

          <aside className="order-first space-y-4 lg:order-none">
            <section className="rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-5 sm:py-5">
              <h2 className="text-[17px] font-bold text-[#111827] sm:text-[18px]">연관 검색어</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(data?.relatedKeywords ?? []).map((keyword) => (
                  <Link
                    key={keyword}
                    href={`/search?q=${encodeURIComponent(keyword)}`}
                    className="rounded-full bg-[#f3f4f6] px-3 py-2 text-[13px] text-[#374151]"
                  >
                    {keyword}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
