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

const defaultRecommendKeywords = [
  "\uB9D0\uCC28",
  "\uAC24\uB7ED\uC2DCS26",
  "\uCF54\uD2B8",
  "\uCF00\uC774\uC2A4\uD2F0\uD30C\uC774",
  "\uB2CC\uD150\uB3C4\uC2A4\uC704\uCE582",
  "\uCD08\uCF5C\uB9BF \uCE58\uC988\uCF00\uC774\uD06C",
  "\uC544\uC774\uD3F017",
  "\uB8E8\uC774\uBE44\uD1B5",
];

const defaultBenefitChips = [
  { label: "\uC2A4\uD0C0\uC77C \uC704\uD06C [3.9~15] \uB124\uC774\uBC84 \uB2E8\uB3C5 \uD2B9\uAC00" },
  { label: "\uC2A4\uD0C0\uC77C \uC704\uD06C" },
];

const defaultTrendKeywords: TrendItem[] = [
  { rank: 1, keyword: "\uB9D0\uCC28", status: "same" },
  { rank: 2, keyword: "\uCD08\uCF5C\uB9BF \uCE58\uC988\uCF00\uC774\uD06C", status: "same" },
  { rank: 3, keyword: "\uCF00\uC774\uC2A4\uD2F0\uD30C\uC774", status: "same" },
  { rank: 4, keyword: "\uB2CC\uD150\uB3C4\uC2A4\uC704\uCE582", status: "same" },
  { rank: 5, keyword: "\uC544\uC774\uD3F017e", status: "same" },
  { rank: 6, keyword: "\uAC24\uB7ED\uC2DCS26", status: "same" },
  { rank: 7, keyword: "\uCF54\uD2B8", status: "up" },
  { rank: 8, keyword: "\uB8E8\uC774\uBE44\uD1B5", status: "up" },
  { rank: 9, keyword: "\uC544\uC774\uD3F017", status: "up" },
  { rank: 10, keyword: "\uB7F0\uB2DD\uD654", status: "up" },
];

export default function SearchBoxWithDropdown({
  value,
  onChange,
  placeholder = "\uC0C1\uD488\uBA85 \uB610\uB294 \uBE0C\uB79C\uB4DC \uC785\uB825",
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
    if (trendKeywords.length <= 5) {
      return [trendKeywords];
    }

    return [trendKeywords.slice(0, 5), trendKeywords.slice(5, 10)];
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
      <div className="flex h-12 items-center rounded-lg border-2 border-violet-400 bg-white">
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
          className="flex-1 px-4 text-[14px] outline-none"
        />

        <button
          type="button"
          aria-label={open ? "\uAC80\uC0C9 \uC0C1\uC138 \uB2EB\uAE30" : "\uAC80\uC0C9 \uC0C1\uC138 \uC5F4\uAE30"}
          className="flex h-full items-center justify-center px-3 hover:bg-gray-50"
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
          aria-label="\uAC80\uC0C9"
          className="flex h-full items-center justify-center rounded-r-md px-4 text-violet-600 hover:bg-violet-50"
          onClick={() => submitSearch()}
        >
          <SearchIcon />
        </button>
      </div>

      {open ? (
        <div className="absolute left-0 top-[52px] z-50 w-full overflow-hidden rounded-[18px] border border-violet-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:rounded-b-xl">
          <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
            <section>
              <div className="text-[13px] font-medium text-gray-700">{"\uCD5C\uADFC \uAC80\uC0C9\uC5B4"}</div>
              <div className="mb-8 mt-5 text-center text-[15px] text-gray-500">
                {recentKeywords.length === 0 ? (
                  <span>{"\uCD5C\uADFC \uAC80\uC0C9\uC5B4 \uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."}</span>
                ) : (
                  <div className="flex flex-wrap justify-start gap-2">
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
                <span>{"\uCD94\uCC9C \uAC80\uC0C9\uC5B4"}</span>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
                  i
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {recommendKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    className="cursor-pointer rounded-full bg-gray-100 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-200"
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
              <div className="text-[13px] font-medium text-gray-700">{"\uC624\uB298\uC758 \uD61C\uD0DD"}</div>

              <div className="mt-4 flex flex-wrap items-center gap-2 overflow-hidden">
                {benefitChips.map((chip, index) => (
                  <button
                    key={`${chip.label}-${index}`}
                    type="button"
                    className="max-w-full truncate rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-100 md:max-w-[220px]"
                  >
                    {chip.label}
                  </button>
                ))}

                <button
                  type="button"
                  className="h-8 w-8 shrink-0 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                  aria-label="\uD61C\uD0DD \uB354\uBCF4\uAE30"
                >
                  +
                </button>
              </div>
            </section>

            <section className="mt-6">
              <div className="flex flex-col gap-1 text-[13px] text-gray-700 sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium">{"\uC778\uAE30 \uAC80\uC0C9\uC5B4"}</span>
                <span className="text-gray-400">03.12. \uAE30\uC900, \uC804\uCCB4</span>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-full bg-violet-600 px-4 py-2 text-[13px] font-medium text-white"
                >
                  {"\uC804\uCCB4"}
                </button>
              </div>

              <div className={`mt-4 grid gap-x-10 gap-y-3 ${trendColumns.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {trendColumns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="space-y-3"
                  >
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
                        <span className="w-5 text-[24px] font-bold leading-none text-black">
                          {item.rank}
                        </span>
                        <span className="flex-1 truncate text-[14px] text-gray-800">
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
            <div>{"\uC790\uB3D9\uC800\uC7A5 \uB04C\uAE30 | \uAD00\uB9AC"}</div>
            <button
              type="button"
              className="text-gray-500 hover:underline"
              onClick={() => setOpen(false)}
            >
              {"\uB2EB\uAE30"}
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
    return <span className="text-[11px] text-red-500">{"\uC0C1\uC2B9"}</span>;
  }

  if (status === "down") {
    return <span className="text-[11px] text-blue-500">{"\uD558\uB77D"}</span>;
  }

  return <span className="text-[11px] text-green-600">NEW</span>;
}
