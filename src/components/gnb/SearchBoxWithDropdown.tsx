"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import ChevronBottomIcon from "@/components/icons/ChevronBottomIcon";

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

export default function SearchBoxWithDropdown({
  value,
  onChange,
  placeholder = "상품명 또는 브랜드 입력",
  widthClassName = "w-full",
  recentKeywords = [],
  recommendKeywords = [
    "자라",
    "갤럭시S26",
    "포코피아",
    "케이스티파이",
    "닌텐도스위치2",
    "촉촉한황치즈칩",
    "아이폰17",
    "루이비통",
  ],
  benefitChips = [{ label: "신상위크 [3.9~15] 네이버 단독 첫공개" }, { label: "신상위크" }],
  trendKeywords = [
    { rank: 1, keyword: "자라", status: "same" },
    { rank: 2, keyword: "촉촉한황치즈칩", status: "same" },
    { rank: 3, keyword: "케이스티파이", status: "same" },
    { rank: 4, keyword: "닌텐도스위치2", status: "same" },
    { rank: 5, keyword: "아이폰17e", status: "same" },
    { rank: 6, keyword: "갤럭시s26", status: "same" },
    { rank: 7, keyword: "포코피아", status: "up" },
    { rank: 8, keyword: "루이비통", status: "up" },
    { rank: 9, keyword: "아이폰17", status: "up" },
    { rank: 10, keyword: "룰루레몬", status: "up" },
  ],
  onSearch,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
    const left = trendKeywords.slice(0, 5);
    const right = trendKeywords.slice(5, 10);
    return [left, right];
  }, [trendKeywords]);

  const submitSearch = (keyword?: string) => {
    const finalKeyword = keyword ?? value;
    if (!finalKeyword.trim()) return;
    onSearch?.(finalKeyword.trim());
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative ${widthClassName}`}
    >
      <div className="h-12 rounded-lg border-2 border-violet-400 bg-white flex items-center">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitSearch();
            }
          }}
          placeholder={placeholder}
          className="flex-1 outline-none text-[14px] px-4"
        />

        <button
          type="button"
          aria-label={open ? "검색 상세 닫기" : "검색 상세 열기"}
          className="h-full px-3 flex items-center justify-center  hover:bg-gray-50"
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
          className="h-full px-4 flex items-center justify-center text-violet-600 hover:bg-violet-50 rounded-r-md"
          onClick={() => submitSearch()}
        >
          <SearchIcon />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-[52px] z-50 w-full rounded-b-xl border border-violet-300 border-t-0 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="px-4 py-4">
            {/* 최근 검색어 */}
            <section>
              <div className="text-[13px] text-gray-700 font-medium">최근 검색어</div>
              <div className="mt-8 mb-10 text-center text-[15px] text-gray-500">
                {recentKeywords.length === 0 ? (
                  <span>최근 검색어 내역이 없습니다.</span>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-start">
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

            {/* 추천 검색어 */}
            <section>
              <div className="flex items-center gap-1 text-[13px] text-gray-700 font-medium">
                <span>추천 검색어</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] text-gray-400">
                  i
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {recommendKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    className="rounded-full bg-gray-100 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-200 cursor-pointer"
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

            {/* 오늘의 혜택 */}
            <section className="mt-6">
              <div className="text-[13px] text-gray-700 font-medium">오늘의 혜택</div>

              <div className="mt-4 flex items-center gap-2 overflow-hidden">
                {benefitChips.map((chip, idx) => (
                  <button
                    key={`${chip.label}-${idx}`}
                    type="button"
                    className="max-w-[220px] truncate rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-100"
                  >
                    {chip.label}
                  </button>
                ))}

                <button
                  type="button"
                  className="shrink-0 w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                  ›
                </button>
              </div>
            </section>

            {/* 인기 검색어 */}
            <section className="mt-6">
              <div className="flex items-center gap-2 text-[13px] text-gray-700">
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

              <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-3">
                {trendColumns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="space-y-3"
                  >
                    {column.map((item) => (
                      <button
                        key={item.rank}
                        type="button"
                        className="flex w-full items-center gap-3 text-left hover:bg-gray-50 rounded-md px-1 py-1"
                        onClick={() => {
                          onChange(item.keyword);
                          submitSearch(item.keyword);
                        }}
                      >
                        <span className="w-5 text-[24px] leading-none font-bold text-black">
                          {item.rank}
                        </span>
                        <span className="flex-1 text-[14px] text-gray-800 truncate">
                          {item.keyword}
                        </span>
                        <TrendStatus status={item.status} />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-[12px] text-gray-400">
            <div>자동저장 끄기 · 도움말</div>
            <button
              type="button"
              className="text-gray-500 hover:underline"
              onClick={() => setOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TrendStatus({ status }: { status?: "up" | "down" | "new" | "same" }) {
  if (!status || status === "same") {
    return <span className="text-[12px] text-gray-300">-</span>;
  }

  if (status === "up") {
    return <span className="text-[11px] text-red-500">▲</span>;
  }

  if (status === "down") {
    return <span className="text-[11px] text-blue-500">▼</span>;
  }

  return <span className="text-[11px] text-green-600">NEW</span>;
}
