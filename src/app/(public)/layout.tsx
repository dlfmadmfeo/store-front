"use client";

import GnbHeader from "@/components/gnb/GnbHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="p-2">
        <GnbHeader />
      </div>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
