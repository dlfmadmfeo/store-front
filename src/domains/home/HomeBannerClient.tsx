"use client";

import dynamic from "next/dynamic";

const MainBannerCarousel = dynamic(() => import("./MainBannerCarousel"), {
  ssr: false,
});

export default function HomeBannerClient() {
  return <MainBannerCarousel />;
}
