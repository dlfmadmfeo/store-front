import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import PromoCard from "./PromoCard";
import type { PromoItem } from "./types";

export default function TodayEventSection({
  title = "오늘의 행사 놓치지 마세요",
  items,
  onViewAll,
}: {
  title?: string;
  items: PromoItem[];
  onViewAll?: () => void;
}) {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8">
      <div className="flex items-end justify-between">
        <h2 className="text-[18px] font-extrabold tracking-[-0.02em] md:text-[24px]">
          <span className="text-violet-600">오늘</span>의 행사 놓치지 마세요
        </h2>

        <div className="flex items-center">
          <button
            type="button"
            onClick={onViewAll}
            className="cursor-pointer text-[14px] text-gray-500 hover:text-gray-700"
          >
            전체보기
          </button>
          <ChevronRightIcon />
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-5">
          {items.map((item) => (
            <div key={item.id} className="col-span-1">
              <PromoCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
