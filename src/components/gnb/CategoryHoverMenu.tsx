"use client";

import { useRouter } from "next/navigation";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import { useCategoryMenuData } from "@/domains/navigation/hooks/useCategoryMenuData";

export default function CategoryHoverMenu() {
  const router = useRouter();
  const { data, isLoading, error } = useCategoryMenuData();

  if (isLoading) {
    return (
      <div className="absolute right-[-22px] top-[calc(100%+1px)] z-50 w-[560px] rounded-[16px] border border-[#e7ebf0] bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-8 animate-pulse rounded-[10px] bg-[#f3f4f6]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="absolute right-[-22px] top-[calc(100%+1px)] z-50 w-[360px] rounded-[16px] border border-[#e7ebf0] bg-white p-5 text-[14px] text-[#6b7280] shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
        카테고리 정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div
      className="absolute right-[-22px] top-[calc(100%+1px)] z-50 w-[560px] overflow-hidden rounded-[16px] border border-[#e7ebf0] bg-white shadow-[0_14px_30px_rgba(15,23,42,0.12)]"
      role="menu"
      aria-label="카테고리 바로가기"
    >
      <div className="grid grid-cols-[170px_210px_1fr]">
        <div className="max-h-[740px] overflow-y-auto border-r border-[#f0f2f5] px-3 py-3">
          <ul className="space-y-1 text-[14px] leading-[20px] text-[#5f6672]">
            {data.primaryCategories.map((item, index) => (
              <li key={item}>
                <button
                  type="button"
                  role="menuitem"
                  className={[
                    "flex h-[36px] w-full items-center justify-between rounded-[8px] px-3 text-left whitespace-nowrap",
                    index === 0
                      ? "bg-[#f5f7f9] font-semibold text-[#111827]"
                      : "hover:bg-[#fafbfc]",
                  ].join(" ")}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                >
                  <span>{item}</span>
                  {index === 0 ? (
                    <ChevronRightIcon className="h-[14px] w-[14px] text-[#4b5563]" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-h-[740px] overflow-y-auto border-r border-[#f0f2f5] px-3 py-3">
          <div className="space-y-1 pb-3">
            {data.featuredSections.map((section) => (
              <button
                key={section.title}
                type="button"
                role="menuitem"
                className="flex h-[36px] w-full items-center justify-between px-2 text-left text-[14px] font-semibold text-[#2f3743] whitespace-nowrap"
                onClick={() => router.push("/category")}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <DotIcon tone={section.tone} />
                  <span>{section.title}</span>
                </span>
                <ChevronRightIcon className="h-[14px] w-[14px] text-[#4b5563]" />
              </button>
            ))}
          </div>

          <ul className="space-y-1 text-[14px] leading-[20px] text-[#5f6672]">
            {data.secondaryCategories.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  role="menuitem"
                  className={[
                    "flex h-[36px] w-full items-center justify-between rounded-[8px] px-3 text-left whitespace-nowrap",
                    item === "생수/탄산수"
                      ? "bg-[#f5f7f9] font-semibold text-[#111827]"
                      : "hover:bg-[#fafbfc]",
                    item === "전체보기" ? "text-[#4f46e5]" : "",
                  ].join(" ")}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                >
                  <span>{item}</span>
                  {item === "생수/탄산수" ? (
                    <ChevronRightIcon className="h-[14px] w-[14px] text-[#4b5563]" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 py-3">
          <ul className="space-y-2 text-[14px] leading-[20px] text-[#5f6672]">
            {data.detailCategories.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  role="menuitem"
                  className={[
                    "flex h-[36px] w-full items-center rounded-[8px] px-3 text-left whitespace-nowrap",
                    item === "전체보기" ? "font-semibold text-[#4f46e5]" : "hover:bg-[#fafbfc]",
                  ].join(" ")}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DotIcon({
  tone = "default",
}: {
  tone?: "green" | "mint" | "purple" | "default";
}) {
  const toneClass =
    tone === "green"
      ? "bg-[#16a34a]"
      : tone === "mint"
        ? "bg-[#22c55e]"
        : tone === "purple"
          ? "bg-[#7c3aed]"
          : "bg-[#9ca3af]";

  return <span className={`inline-flex h-[14px] w-[14px] rounded-full ${toneClass}`} />;
}
