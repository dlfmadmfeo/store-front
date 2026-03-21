"use client";

import { useEffect, useRef } from "react";

type UserProfilePopoverProps = {
  open: boolean;
  userName: string;
  email: string;
  naverPayPoint?: number;
  onLogout: () => void;
};

export default function UserProfilePopover({
  open,
  userName,
  email,
  naverPayPoint = 5051,
  onLogout,
}: UserProfilePopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (!popoverRef.current) return;
      if (!popoverRef.current.contains(event.target as Node)) {
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-[8px] z-50 mt-2 w-[380px] overflow-visible rounded-sm border border-gray-300 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.16)]"
    >
      {/* 화살표 */}
      <div className="absolute right-[42px] top-[-6px] h-3 w-3 rotate-45 border-l border-t border-gray-300 bg-white" />

      {/* 상단 영역 */}
      <div className="flex min-h-[136px]">
        {/* 좌측 프로필 이미지 */}
        <div className="flex w-[118px] items-center justify-center bg-[#fafafa]">
          <div className="relative">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gray-100 text-gray-300">
              <svg
                viewBox="0 0 24 24"
                className="h-[44px] w-[44px] fill-current"
                aria-hidden="true"
              >
                <path d="M12 12c2.761 0 5-2.687 5-6s-2.239-6-5-6-5 2.687-5 6 2.239 6 5 6Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
              </svg>
            </div>

            <button
              type="button"
              className="absolute -bottom-1 -left-1 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-gray-500 text-white shadow-sm"
              aria-label="프로필 이미지 변경"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M9 4.5 7.5 6H5a2 2 0 0 0-2 2v8.5A2.5 2.5 0 0 0 5.5 19h13a2.5 2.5 0 0 0 2.5-2.5V8a2 2 0 0 0-2-2h-2.5L15 4.5H9Zm3 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 우측 정보 영역 */}
        <div className="flex flex-1 flex-col justify-center px-5 py-4">
          <div className="mb-1.5 flex items-center gap-2">
            <div className="text-[16px] font-bold text-gray-900 leading-none">
              <span className="hover:underline">{userName}</span>
              <span className="ml-0.5 font-medium text-gray-500">님</span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 cursor-pointer"
            >
              로그아웃
            </button>
          </div>

          <div className="mb-2 text-[12px] font-medium text-gray-600">{email}</div>

          <div className="mb-2.5 flex items-center gap-2 text-[12px] font-medium text-gray-500">
            <button
              type="button"
              className="hover:underline"
            >
              네이버ID
            </button>
            <span>|</span>
            <button
              type="button"
              className="hover:underline"
            >
              보안설정
            </button>
            <span>|</span>
            <button
              type="button"
              className="hover:underline"
            >
              내인증서
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-bold text-white">
              N
            </div>
            <div className="text-[13px] font-bold text-gray-900">
              {naverPayPoint.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div className="grid grid-cols-3 border-t border-gray-200 bg-[#fafafa]">
        <button
          type="button"
          className="flex h-[48px] items-center justify-center border-r border-gray-200 text-[13px] font-bold text-gray-800 hover:bg-gray-100"
        >
          내블로그
        </button>

        <button
          type="button"
          className="flex h-[48px] items-center justify-center border-r border-gray-200 text-[13px] font-bold text-gray-800 hover:bg-gray-100"
        >
          가입한카페
        </button>

        <button
          type="button"
          className="flex h-[48px] items-center justify-center gap-2 text-gray-800 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-sm bg-gradient-to-br from-green-500 to-blue-500 px-1 py-[1px] text-[9px] font-bold leading-none text-white">
              N+
            </div>
            <div className="mt-[2px] rounded-sm bg-indigo-500 px-1 py-[1px] text-[8px] font-bold leading-none text-white">
              멤버십
            </div>
          </div>

          <div className="text-left leading-tight">
            <div className="text-[10px] font-semibold text-gray-500">최대</div>
            <div className="text-[13px] font-extrabold text-gray-900">5% 적립</div>
          </div>
        </button>
      </div>
    </div>
  );
}
