"use client";

import { useRouter } from "next/navigation";

const topMenus = [
  { label: "마이쇼핑 홈", path: "/myshop" },
  { label: "찜한 상품", path: "/myshop" },
  { label: "관심 스토어", path: "/myshop" },
  { label: "리뷰 작성", path: "/myshop" },
];

const bottomMenus = [
  { label: "주문/배송내역", path: "/myshop/orders" },
  { label: "쿠폰", path: "/myshop" },
];

export default function MyShoppingPopover() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div
      role="menu"
      aria-label="마이쇼핑 바로가기"
      className="absolute right-0 top-[66px] z-50 w-[164px] overflow-visible rounded-[12px] border border-gray-200 bg-white py-3 shadow-[0_16px_30px_rgba(15,23,42,0.12)]"
    >
      <div className="absolute right-[26px] top-[-7px] h-3.5 w-3.5 rotate-45 border-l border-t border-gray-200 bg-white" />

      <div className="px-3">
        {topMenus.map((menu) => (
          <button
            key={menu.label}
            type="button"
            role="menuitem"
            className="flex w-full rounded-[8px] px-3 py-2.5 text-left text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-1"
            onClick={() => handleNavigate(menu.path)}
          >
            {menu.label}
          </button>
        ))}
      </div>

      <div className="my-2 border-t border-gray-100" />

      <div className="px-3">
        {bottomMenus.map((menu) => (
          <button
            key={menu.label}
            type="button"
            role="menuitem"
            className="flex w-full rounded-[8px] px-3 py-2.5 text-left text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-1"
            onClick={() => handleNavigate(menu.path)}
          >
            {menu.label}
          </button>
        ))}
      </div>
    </div>
  );
}
