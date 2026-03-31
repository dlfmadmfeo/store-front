"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ChevronBottomIcon from "@/components/icons/ChevronBottomIcon";
import SearchIcon from "@/components/icons/SearchIcon";

type TrendItem = {
  rank: number;
  keyword: string;
  status?: "up" | "down" | "new" | "same";
};

type BenefitChip = {
  label: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  widthClassName?: string;
  recentKeywords?: string[];
  recommendKeywords?: string[];
  benefitChips?: BenefitChip[];
  trendKeywords?: TrendItem[];
  onSearch?: (keyword: string) => void;
};

const defaultRecommendKeywords = ["말차", "갤럭시S26", "코트", "케이스티파이"];
const defaultBenefitChips = [{ label: "스타일 위크 단독 특가" }];
const defaultTrendKeywords: TrendItem[] = [
  { rank: 1, keyword: "말차", status: "same" },
  { rank: 2, keyword: "초콜릿 치즈케이크", status: "same" },
  { rank: 3, keyword: "케이스티파이", status: "same" },
  { rank: 4, keyword: "닌텐도스위치2", status: "same" },
  { rank: 5, keyword: "아이폰17", status: "same" },
  { rank: 6, keyword: "갤럭시S26", status: "same" },
  { rank: 7, keyword: "코트", status: "up" },
  { rank: 8, keyword: "루이비통", status: "up" },
  { rank: 9, keyword: "러닝화", status: "up" },
  { rank: 10, keyword: "침대 프레임", status: "new" },
];

export default function SearchBoxWithDropdown({
  value,
  onChange,
  placeholder = "상품명 또는 브랜드 입력",
  widthClassName = "w-full",
  recentKeywords = [],
  recommendKeywords = defaultRecommendKeywords,
  benefitChips = defaultBenefitChips,
  trendKeywords = defaultTrendKeywords,
  onSearch,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const trendColumns = useMemo(() => {
    if (trendKeywords.length <= 5) return [trendKeywords];
    return [trendKeywords.slice(0, 5), trendKeywords.slice(5, 10)];
  }, [trendKeywords]);

  const submitSearch = (keyword?: string) => {
    const finalKeyword = keyword ?? value;
    if (!finalKeyword.trim()) return;
    onSearch?.(finalKeyword.trim());
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${widthClassName}`}>
      <div
        className="flex h-12 items-center overflow-hidden rounded-xl border-2 border-violet-400 bg-white"
        role="search"
        aria-label="통합 검색"
      >
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitSearch();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 px-4 text-[14px] outline-none"
          aria-label="검색어 입력"
          aria-expanded={open}
          aria-controls="search-suggestion-panel"
        />

        <button
          type="button"
          aria-label={open ? "검색 상세 닫기" : "검색 상세 열기"}
          className="flex h-full min-w-[42px] items-center justify-center px-2 hover:bg-gray-50 sm:px-3"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronBottomIcon
            width={12}
            height={12}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <button
          type="button"
          aria-label="검색"
          className="flex h-full min-w-[48px] items-center justify-center px-3 text-violet-600 hover:bg-violet-50 sm:px-4"
          onClick={() => submitSearch()}
        >
          <SearchIcon />
        </button>
      </div>

      {open ? (
        <div
          id="search-suggestion-panel"
          className="absolute left-0 top-[54px] z-50 w-full overflow-hidden rounded-[18px] border border-violet-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
            <section>
              <div className="text-[13px] font-medium text-gray-700">최근 검색어</div>
              <div className="mb-6 mt-4 text-[14px] text-gray-500">
                {recentKeywords.length === 0 ? (
                  <span>최근 검색어 내역이 없습니다.</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {recentKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        className="rounded-full bg-gray-100 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-200"
                        onClick={() => {
                          onChange(keyword);
                          submitSearch(keyword);
                        }}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-1 text-[13px] font-medium text-gray-700">
                <span>추천 검색어</span>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
                  i
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {recommendKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    className="rounded-full bg-gray-100 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      onChange(keyword);
                      submitSearch(keyword);
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <div className="text-[13px] font-medium text-gray-700">오늘의 혜택</div>

              <div className="mt-4 flex flex-wrap items-center gap-2 overflow-hidden">
                {benefitChips.map((chip, index) => (
                  <button
                    key={`${chip.label}-${index}`}
                    type="button"
                    className="max-w-full truncate rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-100 sm:max-w-[220px]"
                  >
                    {chip.label}
                  </button>
                ))}

                <button
                  type="button"
                  className="h-8 w-8 shrink-0 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                  aria-label="혜택 더보기"
                >
                  +
                </button>
              </div>
            </section>

            <section className="mt-6">
              <div className="flex flex-col gap-1 text-[13px] text-gray-700 sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium">인기 검색어</span>
                <span className="text-gray-400">03.12. 기준, 전체</span>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-full bg-violet-600 px-4 py-2 text-[13px] font-medium text-white"
                >
                  전체
                </button>
              </div>

              <div className={`mt-4 grid gap-x-8 gap-y-3 ${trendColumns.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {trendColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-3">
                    {column.map((item) => (
                      <button
                        key={item.rank}
                        type="button"
                        className="flex w-full items-center gap-3 rounded-md px-1 py-1 text-left hover:bg-gray-50"
                        onClick={() => {
                          onChange(item.keyword);
                          submitSearch(item.keyword);
                        }}
                      >
                        <span className="w-5 text-[22px] font-bold leading-none text-black">
                          {item.rank}
                        </span>
                        <span className="flex-1 truncate text-[14px] text-gray-800">{item.keyword}</span>
                        <TrendStatus status={item.status} />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-[12px] text-gray-400">
            <div>자동저장 끄기 | 관리</div>
            <button
              type="button"
              className="text-gray-500 hover:underline"
              onClick={() => setOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TrendStatus({ status }: { status?: "up" | "down" | "new" | "same" }) {
  if (!status || status === "same") {
    return <span className="text-[12px] text-gray-300">-</span>;
  }

  if (status === "up") {
    return <span className="text-[11px] text-red-500">상승</span>;
  }

  if (status === "down") {
    return <span className="text-[11px] text-blue-500">하락</span>;
  }

  return <span className="text-[11px] text-green-600">NEW</span>;
}
