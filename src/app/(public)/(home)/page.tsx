"use client";

import { InlineErrorState, SectionSkeleton } from "@/components/common/SectionSkeleton";
import MainBannerCarousel from "@/domains/home/MainBannerCarousel";
import ShortcutMenu from "@/domains/home/ShortcutMenu";
import { useTodayEventsData } from "@/domains/home/hooks/useTodayEventsData";
import TodayEventSection from "@/domains/home/todayEvent/TodayEventSection";

export default function HomePage() {
  const { items, isLoading, error } = useTodayEventsData();

  return (
    <div className="relative">
      <div className="-mx-4 hidden md:block">
        <MainBannerCarousel />
      </div>

      <div className="mb-8">
        <ShortcutMenu />
      </div>

      <div className="border-b border-t border-gray-200 py-2">
        {error ? (
          <div className="px-4 py-6">
            <InlineErrorState
              title="이벤트 정보를 불러오지 못했습니다"
              description={error}
            />
          </div>
        ) : isLoading ? (
          <div className="mx-auto grid max-w-[1400px] gap-4 px-4 py-8 md:grid-cols-3">
            <SectionSkeleton lines={4} />
            <SectionSkeleton lines={4} />
            <SectionSkeleton lines={4} />
          </div>
        ) : (
          <TodayEventSection items={items} />
        )}
      </div>
    </div>
  );
}
