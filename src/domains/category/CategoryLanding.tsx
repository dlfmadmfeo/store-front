"use client";

import Link from "next/link";
import { InlineErrorState, SectionSkeleton } from "@/components/common/SectionSkeleton";
import { useCategoryMenuData } from "@/domains/navigation/hooks/useCategoryMenuData";

export default function CategoryLanding() {
  const { data, isLoading, error } = useCategoryMenuData();

  return (
    <div className="bg-[#f4f7fb] px-3 py-6 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[1280px]">
        <section className="rounded-[18px] bg-white px-5 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-7">
          <p className="text-[13px] font-medium text-[#5f6672]">카테고리</p>
          <h1 className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-[#111827] sm:text-[32px]">
            상품 탐색 허브
          </h1>
          <p className="mt-3 text-[15px] text-[#6b7280]">
            사용자가 빠르게 카테고리와 세부 분류를 탐색할 수 있도록 구성한 모바일/데스크톱 공용 화면입니다.
          </p>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          {isLoading ? (
            <>
              <SectionSkeleton lines={10} titleWidth="w-24" />
              <SectionSkeleton lines={8} titleWidth="w-36" />
            </>
          ) : error || !data ? (
            <div className="lg:col-span-2">
              <InlineErrorState
                title="카테고리 정보를 불러오지 못했습니다"
                description="잠시 후 다시 시도해 주세요."
              />
            </div>
          ) : (
            <>
              <section className="rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <h2 className="px-2 text-[18px] font-bold text-[#111827]">전체 카테고리</h2>
                <div className="mt-4 grid gap-1">
                  {data.primaryCategories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="rounded-[12px] px-3 py-3 text-left text-[14px] font-medium text-[#4b5563] hover:bg-[#f8fafc] hover:text-[#111827]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <div className="space-y-5">
                <section className="rounded-[18px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-6">
                  <h2 className="text-[20px] font-bold text-[#111827]">큐레이션 영역</h2>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {data.featuredSections.map((section) => (
                      <div
                        key={section.title}
                        className="rounded-[16px] border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4"
                      >
                        <p className="text-[13px] font-medium text-[#10b981]">추천</p>
                        <h3 className="mt-2 text-[17px] font-semibold text-[#111827]">{section.title}</h3>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[18px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-6">
                  <h2 className="text-[20px] font-bold text-[#111827]">세부 분류</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.secondaryCategories.map((item) => (
                      <Link
                        key={item}
                        href={`/search?q=${encodeURIComponent(item)}`}
                        className="rounded-full bg-[#f3f4f6] px-3 py-2 text-[13px] text-[#374151]"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
