// src/app/(public)/page.tsx
import MainBannerCarousel from "@/domains/home/MainBannerCarousel";
import ShortcutMenu from "@/domains/home/ShortcutMenu";
import TodayEventSection from "@/domains/home/todayEvent/TodayEventSection";

import { MOCK_TODAY_EVENTS } from "@/domains/home/todayEvent/mock";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <div className="hidden md:block -mx-4">
          <MainBannerCarousel />
        </div>
        <div className="mb-8">
          <ShortcutMenu />
        </div>
        {/* event */}
        <div className="border-b border-t py-2 border-gray-200">
          <TodayEventSection items={MOCK_TODAY_EVENTS} />
        </div>
      </div>
    </>
  );
}
