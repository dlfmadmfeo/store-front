"use client";

import { usePathname, useRouter } from "next/navigation";
import { myShoppingMenuSections } from "./mockData";

export default function MyShoppingMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const mobileMenus = myShoppingMenuSections.filter((menu) => menu.path).slice(0, 4);

  return (
    <nav
      aria-label="마이쇼핑 모바일 메뉴"
      className="scrollbar-none -mx-2 overflow-x-auto px-2"
    >
      <div className="flex gap-2">
        {mobileMenus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <button
              key={menu.title}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className={[
                "shrink-0 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2",
                isActive
                  ? "border-[#09aa5c] bg-[#eaf8f0] text-[#078a4a]"
                  : "border-gray-200 bg-white text-gray-700",
              ].join(" ")}
              onClick={() => router.push(menu.path!)}
            >
              {menu.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
