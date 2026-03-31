import type { ReactNode } from "react";
import MyShoppingSidebar from "./MyShoppingSidebar";

export default function MyShoppingShell({
  children,
  mobileNavigation,
  isWebview = false,
  webviewHeader,
}: {
  children: ReactNode;
  mobileNavigation?: ReactNode;
  isWebview?: boolean;
  webviewHeader?: ReactNode;
}) {
  return (
    <section
      aria-label="마이쇼핑 페이지"
      className="bg-[#eef2f5]"
    >
      <div className="px-2">
        <div className={`mx-auto max-w-[1280px] ${isWebview ? "py-3 md:py-4" : "py-4 md:py-6"}`}>
          {isWebview ? <div className="mb-4">{webviewHeader}</div> : null}
          {!isWebview && mobileNavigation ? <div className="mb-4 md:hidden">{mobileNavigation}</div> : null}

          <div className="flex gap-5">
            {!isWebview ? <MyShoppingSidebar /> : null}
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
