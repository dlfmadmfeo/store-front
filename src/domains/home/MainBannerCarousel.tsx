// src/domains/home/components/MainBannerCarousel.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const AUTO_PLAY_MS = 2000; // 2초

type Banner = {
  id: number;
  bg: string;
  title: string;
  desc: string;
};

export default function MainBannerCarousel() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(true);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [clientWidth, setClientW] = useState(0);
  const [scrollWidth, setScrollW] = useState(0);

  const banners: Banner[] = useMemo(
    () => [
      { id: 1, bg: "#1f4fa3", title: "OPEN런", desc: "한국 최초, 레고 포켓몬 출시!" },
      { id: 2, bg: "#e38b3a", title: "설날 선물 고민", desc: "쉽고 빠르게 전하기" },
      { id: 3, bg: "#c6a68c", title: "컬리N마트", desc: "처음이면 특가로 시작" },
      { id: 4, bg: "#8b003c", title: "N+ 스토어", desc: "오랜만인 사람을 찾습니다" },
      { id: 5, bg: "#1f4fa3", title: "OPEN런", desc: "한국 최초, 레고 포켓몬 출시!" },
      { id: 6, bg: "#e38b3a", title: "설날 선물 고민", desc: "쉽고 빠르게 전하기" },
      { id: 7, bg: "#c6a68c", title: "컬리N마트", desc: "처음이면 특가로 시작" },
      { id: 8, bg: "#8b003c", title: "N+ 스토어", desc: "오랜만인 사람을 찾습니다" },
      { id: 9, bg: "#e38b3a", title: "설날 선물 고민", desc: "쉽고 빠르게 전하기" },
      { id: 10, bg: "#c6a68c", title: "컬리N마트", desc: "처음이면 특가로 시작" },
      { id: 11, bg: "#8b003c", title: "N+ 스토어", desc: "오랜만인 사람을 찾습니다" },
    ],
    []
  );

  const isScrollRef = useRef(false);
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const thumbWPercent = scrollWidth > 0 ? Math.min(100, (clientWidth / scrollWidth) * 100) : 0;
  const thumbLeftPercent = maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - thumbWPercent) : 0;

  const getPageSize = () => Math.max(1, clientWidth); // 0 방지

  const getLastPage = () => {
    const pageSize = getPageSize();
    return Math.round(maxScroll / pageSize);
  };

  const getCurrPage = () => {
    const pageSize = getPageSize();
    return Math.round(scrollLeft / pageSize);
  };

  const scrollToLeft = (left: number) => {
    const track = bannerRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(maxScroll, left));
    isScrollRef.current = true;
    track.scrollTo({ left: clamped, behavior: "smooth" });

    setTimeout(() => {
      isScrollRef.current = false;
    }, 300);
  };

  const goNext = () => {
    const track = bannerRef.current;
    if (!track) return;

    const scrollLeftNow = track.scrollLeft;
    const clientWNow = track.clientWidth;
    const scrollWNow = track.scrollWidth;

    const maxScrollNow = Math.max(0, scrollWNow - clientWNow);
    const pageSize = Math.max(1, clientWNow);

    const currPage = Math.round(scrollLeftNow / pageSize);
    const lastPage = Math.round(maxScrollNow / pageSize);

    isScrollRef.current = true;

    if (currPage >= lastPage || scrollLeftNow >= maxScrollNow - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const nextLeft = (currPage + 1) * pageSize;
      track.scrollTo({ left: Math.min(nextLeft, maxScrollNow), behavior: "smooth" });
    }

    setTimeout(() => {
      isScrollRef.current = false;
    }, 600);
  };

  const goPrev = () => {
    const pageSize = getPageSize();
    const currPage = getCurrPage();
    const lastPage = getLastPage();

    if (currPage <= 0 || scrollLeft <= 2) {
      // 맨 처음이면 이전은 맨 끝
      scrollToLeft(lastPage * pageSize);
      return;
    }

    scrollToLeft((currPage - 1) * pageSize);
  };

  // 스크롤 시, 게이지에 업데이트, currIdx 업데이트
  useEffect(() => {
    const track = bannerRef.current;
    if (!track) return;

    const updateMetrics = () => {
      setScrollLeft(track.scrollLeft);
      setClientW(track.clientWidth);
      setScrollW(track.scrollWidth);
    };

    const onScroll = () => {
      updateMetrics();

      // 덮어쓰기 방지
      if (isScrollRef.current) return;
    };

    updateMetrics();

    track.addEventListener("scroll", onScroll, { passive: true });

    // 반응형 대응하기
    const ro = new ResizeObserver(() => updateMetrics());
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // 2) 자동재생
  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      goNext();
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="">
      <hr className="py-2 text-gray-400" />
      <section className="mb-8 w-full max-w-full overflow-hidden">
        {/* 캐러셀 */}
        <div className="mx-auto w-full">
          <div
            ref={bannerRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden px-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {banners.map((bInfo, idx) => (
              <div
                key={bInfo.id}
                data-idx={idx}
                className="snap-start shrink-0"
              >
                <BannerItem
                  bg={bInfo.bg}
                  title={bInfo.title}
                  desc={bInfo.desc}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 하단: 네이버식 가로 게이지 + 오른쪽 컨트롤 */}
        <div className="mt-3 px-4 gap-3 flex items-center mx-auto">
          {/* 게이지 레일 */}
          <div
            className="relative h-[2px] flex-1 bg-gray-200 cursor-pointer"
            aria-label="배너 스크롤 게이지"
            role="slider"
          >
            {/* thumb(검정 바) */}
            <div
              className="bg-gray-900 transition-[left,width] duration-150 absoulte top-0 h-full"
              style={{
                width: `${thumbWPercent}%`,
                left: `${thumbLeftPercent}%`,
              }}
            />
          </div>

          {/* 네이버처럼 오른쪽: < > || */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-7 w-7 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-40 cursor-pointer"
              onClick={goPrev}
              aria-label="이전"
              title="이전"
            >
              ‹
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-40 cursor-pointer"
              onClick={goNext}
              aria-label="다음"
              title="다음"
            >
              ›
            </button>

            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="h-7 w-7 rounded-md border border-gray-200 bg-white text-sm"
              aria-label={paused ? "재생" : "일시정지"}
              title={paused ? "재생" : "일시정지"}
            >
              {paused ? "▶" : "Ⅱ"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BannerItem({ bg, title, desc }: { bg: string; title: string; desc: string }) {
  return (
    <div
      className="min-w-[420px] h-[200px] rounded-xl p-6 text-white box-border shrink-0"
      style={{
        background: bg,
      }}
    >
      <h3 className="text-[22px] font-bold">{title}</h3>
      <p className="mt-2">{desc}</p>
    </div>
  );
}
