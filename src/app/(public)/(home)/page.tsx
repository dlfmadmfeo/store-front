import HomeBannerClient from "@/domains/home/HomeBannerClient";
import ShortcutMenu from "@/domains/home/ShortcutMenu";
import TodayEventSection from "@/domains/home/todayEvent/TodayEventSection";
import { getTodayEventsData } from "@/lib/api/home";

export default async function HomePage() {
  const items = await getTodayEventsData();

  return (
    <div className="relative">
      <div className="-mx-4 hidden md:block">
        <HomeBannerClient />
      </div>

      <div className="mb-8">
        <ShortcutMenu />
      </div>

      <div className="border-b border-t border-gray-200 py-2">
        <TodayEventSection items={items} />
      </div>
    </div>
  );
}
