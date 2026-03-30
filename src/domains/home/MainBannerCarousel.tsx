"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

const AUTO_PLAY_MS = 2000;

type Banner = {
  id: number;
  bg: string;
  title: string;
  desc: string;
};

export default function MainBannerCarousel() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);

  const banners: Banner[] = useMemo(
    () => [
      { id: 1, bg: "#1f4fa3", title: "OPEN런", desc: "한국 최초, 레고 포켓몬 출시!" },
      { id: 2, bg: "#e38b3a", title: "설날 선물 고민", desc: "쉽고 빠르게 전하기" },
      { id: 3, bg: "#c6a68c", title: "컬리마트", desc: "처음이면 특가로 시작" },
      { id: 4, bg: "#8b003c", title: "N+ 스토어", desc: "오랜만인 사람을 찾습니다" },
      { id: 5, bg: "#1f4fa3", title: "OPEN런", desc: "한국 최초, 레고 포켓몬 출시!" },
      { id: 6, bg: "#e38b3a", title: "설날 선물 고민", desc: "쉽고 빠르게 전하기" },
      { id: 7, bg: "#c6a68c", title: "컬리마트", desc: "처음이면 특가로 시작" },
      { id: 8, bg: "#8b003c", title: "N+ 스토어", desc: "오랜만인 사람을 찾습니다" },
      { id: 9, bg: "#e38b3a", title: "설날 선물 고민", desc: "쉽고 빠르게 전하기" },
      { id: 10, bg: "#c6a68c", title: "컬리마트", desc: "처음이면 특가로 시작" },
      { id: 11, bg: "#8b003c", title: "N+ 스토어", desc: "오랜만인 사람을 찾습니다" },
    ],
    []
  );

  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const thumbWPercent =
    scrollWidth > 0 ? Math.min(100, (clientWidth / scrollWidth) * 100) : 0;
  const thumbLeftPercent =
    maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - thumbWPercent) : 0;

  const getStepWidth = () => {
    if (stepWidth > 0) return stepWidth;
    return Math.max(1, clientWidth);
  };

  const scrollToLeft = (left: number) => {
    const track = bannerRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(maxScroll, left));
    track.scrollTo({ left: clamped, behavior: "smooth" });
  };

  const goNext = () => {
    const step = getStepWidth();
    const nextLeft = scrollLeft + step;

    if (nextLeft >= maxScroll - 2) {
      scrollToLeft(0);
      return;
    }

    scrollToLeft(nextLeft);
  };

  const goPrev = () => {
    const step = getStepWidth();
    const prevLeft = scrollLeft - step;

    if (scrollLeft <= 2) {
      scrollToLeft(maxScroll);
      return;
    }

    scrollToLeft(prevLeft);
  };

  const handleAutoPlay = useEffectEvent(() => {
    const step = getStepWidth();
    const nextLeft = scrollLeft + step;

    if (nextLeft >= maxScroll - 2) {
      scrollToLeft(0);
      return;
    }

    scrollToLeft(nextLeft);
  });

  useEffect(() => {
    const track = bannerRef.current;
    if (!track) return;

    const updateMetrics = () => {
      setScrollLeft(track.scrollLeft);
      setClientWidth(track.clientWidth);
      setScrollWidth(track.scrollWidth);

      const firstCard = track.querySelector<HTMLElement>("[data-banner-item]");
      if (!firstCard) return;

      const trackStyle = window.getComputedStyle(track);
      const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap || "0");
      setStepWidth(firstCard.offsetWidth + gap);
    };

    updateMetrics();

    const onScroll = () => {
      setScrollLeft(track.scrollLeft);
    };

    track.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateMetrics());
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      handleAutoPlay();
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div>
      <hr className="py-2 text-gray-400" />
      <section className="mb-8 w-full max-w-full overflow-hidden">
        <div className="mx-auto w-full">
          <div
            ref={bannerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                data-banner-item
                className="snap-start shrink-0"
              >
                <BannerItem
                  bg={banner.bg}
                  title={banner.title}
                  desc={banner.desc}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-3 flex items-center gap-3 px-4">
          <div
            className="relative h-[2px] flex-1 overflow-hidden bg-gray-200"
            aria-label="배너 진행 게이지"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(
              maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
            )}
          >
            <div
              className="absolute top-0 h-full bg-gray-900 transition-[left,width] duration-200"
              style={{
                width: `${thumbWPercent}%`,
                left: `${thumbLeftPercent}%`,
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-7 w-7 cursor-pointer rounded-md border border-gray-200 bg-white text-sm disabled:opacity-40"
              onClick={goPrev}
              aria-label="이전"
              title="이전"
            >
              {"‹"}
            </button>
            <button
              type="button"
              className="h-7 w-7 cursor-pointer rounded-md border border-gray-200 bg-white text-sm disabled:opacity-40"
              onClick={goNext}
              aria-label="다음"
              title="다음"
            >
              {"›"}
            </button>

            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="h-7 w-7 rounded-md border border-gray-200 bg-white text-sm"
              aria-label={paused ? "재생" : "일시정지"}
              title={paused ? "재생" : "일시정지"}
            >
              {paused ? "▶" : "||"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BannerItem({
  bg,
  title,
  desc,
}: {
  bg: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="box-border h-[200px] min-w-[420px] shrink-0 rounded-xl p-6 text-white"
      style={{ background: bg }}
    >
      <h3 className="text-[22px] font-bold">{title}</h3>
      <p className="mt-2">{desc}</p>
    </div>
  );
}
