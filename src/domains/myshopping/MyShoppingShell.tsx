"use client";

import type { ReactNode } from "react";
import MyShoppingSidebar from "./MyShoppingSidebar";

export default function MyShoppingShell({
  children,
  mobileNavigation,
}: {
  children: ReactNode;
  mobileNavigation?: ReactNode;
}) {
  return (
    <div className="bg-[#eef2f5]">
      <div className="px-2">
        <div className="mx-auto max-w-[1280px] py-4 md:py-6">
          {mobileNavigation ? <div className="mb-4 md:hidden">{mobileNavigation}</div> : null}

          <div className="flex gap-5">
            <MyShoppingSidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
