"use client";

import CartIcon from "@/components/icons/CartIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import CategoryRectIcon from "@/components/icons/CategoryRectIcon";
import MyShoppingIcon from "@/components/icons/MyShoppingIcon";
import NaverPayIcon from "@/components/icons/NaverPayIcon";
import NaverPlusIcon from "@/components/icons/NaverPlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmailIcon from "../icons/EmailIcon";
import HeaderEmailIcon from "../icons/HeaderEmailIcon";
import MessageIcon from "../icons/MessageIcon";
import NotificationBellIcon from "../icons/NotificationBellIcon";
import BadgeCount from "../BadgeCount";
import { useUserStore } from "@/store/useUserStore";
import UserIcon from "../icons/UserIcon";
import ChevronBottomIcon from "../icons/ChevronBottomIcon";
import UserProfilePopover from "./UserProfilePopover";
import SearchBoxWithDropdown from "./SearchBoxWithDropdown";

const menus = [
  { key: "CATEGORY", label: "카테고리", path: "/category", Icon: CategoryIcon },
  { key: "MY_SHOPPING", label: "마이쇼핑", path: "/myshop", Icon: MyShoppingIcon },
  { key: "CART", label: "장바구니", path: "/cart", Icon: CartIcon },
];

type HeaderMenu = "CATEGORY" | "MY_SHOPPING" | "CART" | null;

export default function GnbHeader() {
  const [q, setQ] = useState<string>("");
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<HeaderMenu>(null);
  const [cartProductCount, setCartProductCount] = useState<number>(999);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const userInfo = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  const clickUserProfile = () => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
    } else {
      setIsProfileOpen(true);
    }
  };

  return (
    <header className="mx-auto max-w-[1280px]">
      <div className="">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-600">Naver</span>
            <span className="font-bold text-gray-600 flex items-center">
              {" "}
              <NaverPayIcon />
              <span className="ml-1">네이버페이</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-gray-600 font-bold text-[12px]">
            <div>
              {isLoggedIn ? (
                <div className="flex gap-3 items-center">
                  {/* 유저 프로필 */}
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded-md hover:underline"
                    onClick={clickUserProfile}
                  >
                    <UserIcon
                      size={24}
                      className="rounded-full border border-gray-400 p-[2px]"
                    />
                    <div>
                      <span className="">{userInfo?.name}</span>
                    </div>
                    <div>
                      <ChevronBottomIcon
                        width={8}
                        height={8}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <UserProfilePopover
                      open={isProfileOpen}
                      // onClose={() => setIsProfileOpen(false)}
                      userName={userInfo?.name ?? ""}
                      email={userInfo?.email ?? ""}
                      naverPayPoint={5051}
                      onLogout={() => {
                        logout();
                        setIsProfileOpen(false);
                        window.location.reload();
                      }}
                    />
                  </div>

                  <div className="cursor-pointer">
                    <MessageIcon className="hover:bg-gray-200 rounded-md" />
                  </div>
                  <div className="relative cursor-pointer">
                    <NotificationBellIcon className="hover:bg-gray-200 rounded-xl" />
                    <div className="">
                      <BadgeCount
                        className={`absolute -right-2 -top-1`}
                        count={10}
                      />
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <HeaderEmailIcon className="hover:bg-gray-200 rounded-xs" />
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="px-2 py-1 border-1 rounded-sm border-gray-300"
                >
                  로그인
                </a>
              )}
            </div>

            <span>|</span>
            <CategoryRectIcon className="shrink-0 w-5 h-5" />
          </div>
        </div>

        <div className="">
          {/* GNB - 헤더 */}
          <div className="flex justify-between gap-6 pt-4">
            <div className="flex items-center flex-1">
              {/* 왼쪽: 로고/타이틀 */}
              <div className="flex items-center gap-3 shrink-0 hidden md:block mr-6">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <NaverPlusIcon />
                </button>
              </div>

              {/* 가운데: 검색 */}
              <div className="flex-1 md:flex-none w-full md:w-[500px]">
                <SearchBoxWithDropdown
                  value={q}
                  onChange={setQ}
                  widthClassName="w-full"
                  recentKeywords={[]}
                  recommendKeywords={[
                    "자라",
                    "갤럭시S26",
                    "포코피아",
                    "케이스티파이",
                    "닌텐도스위치2",
                    "촉촉한황치즈칩",
                    "아이폰17",
                    "루이비통",
                  ]}
                  benefitChips={[
                    { label: "신상위크 [3.9~15] 네이버 단독 첫공개" },
                    { label: "신상위크" },
                  ]}
                  trendKeywords={[
                    { rank: 1, keyword: "자라", status: "same" },
                    { rank: 2, keyword: "촉촉한황치즈칩", status: "same" },
                    { rank: 3, keyword: "케이스티파이", status: "same" },
                    { rank: 4, keyword: "닌텐도스위치2", status: "same" },
                    { rank: 5, keyword: "아이폰17e", status: "same" },
                    { rank: 6, keyword: "갤럭시s26", status: "same" },
                    { rank: 7, keyword: "포코피아", status: "up" },
                    { rank: 8, keyword: "루이비통", status: "up" },
                    { rank: 9, keyword: "아이폰17", status: "up" },
                    { rank: 10, keyword: "룰루레몬", status: "up" },
                  ]}
                  onSearch={(keyword) => {
                    router.push(`/search?q=${encodeURIComponent(keyword)}`);
                  }}
                />
              </div>
            </div>

            {/* 오른쪽: 아이콘 3개 */}
            <div className="hidden md:block">
              <div className="flex items-center justify-center gap-3 shrink-0">
                {menus.map(({ key, label, path, Icon }) => (
                  <div
                    className="relative"
                    key={key}
                  >
                    {key === "CART" ? (
                      <BadgeCount
                        className="absolute right-1"
                        count={cartProductCount}
                      />
                    ) : null}
                    <HeaderIcon
                      key={key}
                      label={label}
                      Icon={<Icon active={activeMenu === key} />}
                      onClick={() => {
                        setActiveMenu(key);
                        router.push(path);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderIcon({
  label,
  Icon,
  onClick,
}: {
  label: string;
  Icon: React.ReactElement;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 text-gray-800 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-lg"
      onClick={onClick}
    >
      <div className="">{Icon}</div>
      <div className="text-[12px]">{label}</div>
    </button>
  );
}

type Props = {
  count: number;
  max?: number; // 예: 99면 99+ 표기
  className?: string;
};
