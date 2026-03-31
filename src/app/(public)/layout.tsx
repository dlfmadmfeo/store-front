"use client";

import GnbHeader from "@/components/gnb/GnbHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#111827] focus:shadow"
      >
        본문으로 바로가기
      </a>
      <div className="p-2">
        <GnbHeader />
      </div>
      <main
        id="main-content"
        className="min-h-screen"
      >
        {children}
      </main>
    </>
  );
}
