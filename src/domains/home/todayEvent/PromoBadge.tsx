// src/domains/home/components/TodayEventSection/PromoBadge.tsx
import type { PromoBadgeType } from "./types";

const badgeClassMap: Record<PromoBadgeType, string> = {
  BRAND_DAY: "bg-violet-600 text-white",
  SEASON_OFF: "bg-violet-600 text-white",
  SUPER_DEAL: "bg-violet-600 text-white",
  HOLIDAY_SHIP: "bg-orange-400 text-white",
  SUPER_TODAY: "bg-violet-600 text-white",
  SHOPPING_LIVE: "bg-blue-500 text-white",
  ONLY_24H: "bg-indigo-500 text-white",
  TODAY_PICK: "bg-violet-600 text-white",
};

export default function PromoBadge({ type, label }: { type: PromoBadgeType; label: string }) {
  return (
    <span
      className={[
        "absolute  z-10",
        "rounded-md px-2 py-1 text-[12px] font-semibold leading-none",
        badgeClassMap[type],
      ].join(" ")}
    >
      {label}
    </span>
  );
}
