// src/domains/home/components/TodayEventSection/TodayEventSection.tsx
"use client";

import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import PromoCard from "./PromoCard";
import type { PromoItem } from "./types";

export default function TodayEventSection({
  title = "오늘의 행사 놓치지 마세요!",
  items,
  onViewAll,
}: {
  title?: string;
  items: PromoItem[];
  onViewAll?: () => void;
}) {
  return (
    <section className="mx-auto w-full px-4 py-8 max-w-[1400px]">
      {/* 헤더 라인 */}
      <div className="flex items-end justify-between">
        <h2 className="text-[18px] md:text-[24px] font-extrabold tracking-[-0.02em]">
          <span className="text-violet-600">오늘</span>의 행사 놓치지 마세요!
        </h2>

        <div className="flex items-center">
          <button
            type="button"
            onClick={onViewAll}
            className="text-[14px] text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            전체보기
          </button>
          <ChevronRightIcon />
        </div>
      </div>

      {/* 카드 영역 */}
      {/* 모바일: 가로 스크롤 / 데스크탑: 그리드 */}
      <div className="mt-4">
        <div className={["grid gap-4", "grid-cols-3", "md:grid-cols-6 md:gap-5"].join(" ")}>
          {items.map((item) => (
            <div
              key={item.id}
              className="col-span-1"
            >
              <PromoCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
