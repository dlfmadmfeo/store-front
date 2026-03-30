"use client";

import { usePathname, useRouter } from "next/navigation";
import { myShoppingMenuSections } from "./mockData";

export default function MyShoppingSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden w-[248px] shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:block">
      <nav aria-label="마이쇼핑 사이드 메뉴">
        {myShoppingMenuSections.map((section, index) => {
          const isActive = section.path ? pathname === section.path : false;

          return (
            <div
              key={section.title}
              className={index === 0 ? "" : "border-t border-gray-100"}
            >
              <button
                type="button"
                disabled={!section.path}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "w-full px-5 py-5 text-left text-[16px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#09aa5c]",
                  section.path ? "cursor-pointer" : "cursor-default",
                  isActive ? "text-[#09a561]" : "text-gray-900",
                ].join(" ")}
                onClick={() => {
                  if (section.path) {
                    router.push(section.path);
                  }
                }}
              >
                {section.title}
              </button>

              {section.items.length > 0 ? (
                <div className="px-5 pb-5 text-[15px] text-gray-600">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="py-1.5"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
