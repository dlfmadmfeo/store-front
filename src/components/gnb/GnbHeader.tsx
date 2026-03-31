"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchPanelData } from "@/domains/navigation/hooks/useSearchPanelData";
import { useUserStore } from "@/store/useUserStore";
import BadgeCount from "../BadgeCount";
import HeaderEmailIcon from "../icons/HeaderEmailIcon";
import MessageIcon from "../icons/MessageIcon";
import NotificationBellIcon from "../icons/NotificationBellIcon";
import UserIcon from "../icons/UserIcon";
import ChevronBottomIcon from "../icons/ChevronBottomIcon";
import CartIcon from "@/components/icons/CartIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import CategoryRectIcon from "@/components/icons/CategoryRectIcon";
import MyShoppingIcon from "@/components/icons/MyShoppingIcon";
import NaverPayIcon from "@/components/icons/NaverPayIcon";
import NaverPlusIcon from "@/components/icons/NaverPlusIcon";
import CategoryHoverMenu from "./CategoryHoverMenu";
import MyShoppingPopover from "./MyShoppingPopover";
import SearchBoxWithDropdown from "./SearchBoxWithDropdown";
import UserProfilePopover from "./UserProfilePopover";

const menus = [
  { key: "CATEGORY", label: "카테고리", path: "/category", Icon: CategoryIcon },
  { key: "MY_SHOPPING", label: "마이쇼핑", path: "/myshop", Icon: MyShoppingIcon },
  { key: "CART", label: "장바구니", path: "/cart", Icon: CartIcon },
] as const;

type HeaderMenu = (typeof menus)[number]["key"] | null;

export default function GnbHeader() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMyShoppingOpen, setIsMyShoppingOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<HeaderMenu>(null);
  const [cartProductCount] = useState(99);

  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const userInfo = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const { data: searchPanelData } = useSearchPanelData();
  const activePath =
    activeMenu === "CATEGORY"
      ? "/category"
      : activeMenu === "MY_SHOPPING"
        ? "/myshop"
        : activeMenu === "CART"
          ? "/cart"
          : null;

  const handleMenuClick = (key: HeaderMenu, path: string) => {
    if (key === "CATEGORY") {
      setActiveMenu((prev) => (prev === "CATEGORY" ? null : "CATEGORY"));
      if (window.innerWidth < 768) {
        router.push(path);
      }
      return;
    }

    setActiveMenu(key);
    router.push(path);
  };

  return (
    <header className="mx-auto max-w-[1280px]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 text-[12px] font-bold text-gray-600">
            <span className="font-bold text-gray-600">Naver</span>
            <span className="flex items-center font-bold text-gray-600">
              <NaverPayIcon />
              <span className="ml-1 hidden sm:inline">네이버페이</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[12px] font-bold text-gray-600 sm:gap-5">
            <div>
              {isLoggedIn ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <button
                      type="button"
                      className="flex min-h-[36px] items-center gap-1 rounded-md px-1 py-1 hover:bg-gray-200 hover:underline"
                      onClick={() => setIsProfileOpen((prev) => !prev)}
                      aria-expanded={isProfileOpen}
                      aria-haspopup="dialog"
                      aria-controls="user-profile-popover"
                      aria-label="프로필 메뉴 열기"
                    >
                      <UserIcon
                        size={24}
                        className="rounded-full border border-gray-400 p-[2px]"
                      />
                      <span className="hidden max-w-[72px] truncate sm:inline">{userInfo?.name}</span>
                      <ChevronBottomIcon width={8} height={8} />
                    </button>

                    <UserProfilePopover
                      open={isProfileOpen}
                      userName={userInfo?.name ?? ""}
                      email={userInfo?.email ?? ""}
                      naverPayPoint={5051}
                      onLogout={() => {
                        logout();
                        setIsProfileOpen(false);
                        router.refresh();
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="hidden min-h-[36px] rounded-md p-1 hover:bg-gray-200 md:block"
                    aria-label="메시지 확인"
                  >
                    <MessageIcon />
                  </button>
                  <button
                    type="button"
                    className="relative hidden min-h-[36px] rounded-md p-1 hover:bg-gray-200 md:block"
                    aria-label="알림 확인"
                  >
                    <NotificationBellIcon />
                    <BadgeCount className="absolute -right-2 -top-1" count={10} />
                  </button>
                  <button
                    type="button"
                    className="hidden min-h-[36px] rounded-md p-1 hover:bg-gray-200 md:block"
                    aria-label="메일 확인"
                  >
                    <HeaderEmailIcon />
                  </button>
                </div>
              ) : (
                <a href="/login" className="rounded-sm border border-gray-300 px-2 py-1">
                  로그인
                </a>
              )}
            </div>

            <span className="hidden sm:inline">|</span>
            <CategoryRectIcon className="h-5 w-5 shrink-0" />
          </div>
        </div>

        <div className="pt-1 md:pt-2">
          <div className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-6">
            <div className="flex w-full flex-col gap-3 md:flex-1 md:flex-row md:items-center">
              <div className="hidden shrink-0 items-center gap-3 md:mr-6 md:flex">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                  aria-label="홈으로 이동"
                >
                  <NaverPlusIcon />
                </button>
              </div>

              <div className="md:hidden">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                  aria-label="홈으로 이동"
                >
                  <NaverPlusIcon />
                </button>
              </div>

              <div className="w-full flex-1 md:w-[500px] md:flex-none">
                <SearchBoxWithDropdown
                  value={q}
                  onChange={setQ}
                  widthClassName="w-full"
                  recentKeywords={searchPanelData?.recentKeywords ?? []}
                  recommendKeywords={searchPanelData?.recommendKeywords ?? []}
                  benefitChips={searchPanelData?.benefitChips ?? []}
                  trendKeywords={searchPanelData?.trendKeywords ?? []}
                  onSearch={(keyword) => {
                    router.push(`/search?q=${encodeURIComponent(keyword)}`);
                  }}
                />
              </div>
            </div>

            <nav aria-label="주요 서비스 메뉴" className="hidden md:block">
              <div className="flex shrink-0 items-start justify-center gap-3">
                {menus.map(({ key, label, path, Icon }) => {
                  const isCategory = key === "CATEGORY";
                  const isMyShopping = key === "MY_SHOPPING";
                  const isCategoryActive = activeMenu === "CATEGORY";
                  const isMyShoppingActive = activeMenu === "MY_SHOPPING";

                  return (
                    <div
                      key={key}
                      className="relative"
                      onMouseEnter={() => {
                        if (isCategory) setIsCategoryOpen(true);
                        if (isMyShopping) setIsMyShoppingOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (isCategory) setIsCategoryOpen(false);
                        if (isMyShopping) setIsMyShoppingOpen(false);
                      }}
                    >
                      {key === "CART" ? (
                        <BadgeCount className="absolute right-1" count={cartProductCount} />
                      ) : null}

                      <HeaderIcon
                        label={label}
                        Icon={
                          <Icon
                            active={
                              key === activeMenu ||
                              (isCategory && (isCategoryOpen || isCategoryActive)) ||
                              (isMyShopping && (isMyShoppingOpen || isMyShoppingActive))
                            }
                          />
                        }
                        active={
                          isCategory
                            ? isCategoryOpen || isCategoryActive
                            : isMyShopping
                              ? isMyShoppingOpen || isMyShoppingActive
                              : key === activeMenu
                        }
                        current={activePath === path}
                        onClick={() => handleMenuClick(key, path)}
                      />

                      {isCategory && isCategoryOpen ? <CategoryHoverMenu /> : null}
                      {isMyShopping && isMyShoppingOpen ? <MyShoppingPopover /> : null}
                    </div>
                  );
                })}
              </div>
            </nav>

            <nav
              aria-label="모바일 빠른 메뉴"
              className="grid grid-cols-3 gap-2 md:hidden"
            >
              {menus.map(({ key, label, path, Icon }) => (
                <button
                  key={key}
                  type="button"
                  className="relative flex min-h-[72px] flex-col items-center justify-center rounded-[14px] border border-gray-200 bg-white px-2 text-gray-800"
                  onClick={() => handleMenuClick(key, path)}
                >
                  {key === "CART" ? (
                    <BadgeCount className="absolute right-3 top-2" count={cartProductCount} />
                  ) : null}
                  <Icon active={activeMenu === key} />
                  <span className="mt-1 text-[12px]">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderIcon({
  label,
  Icon,
  active = false,
  current = false,
  onClick,
}: {
  label: string;
  Icon: React.ReactElement;
  active?: boolean;
  current?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={current ? "page" : undefined}
      className={[
        "flex h-[62px] w-[62px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border text-gray-800 transition-colors",
        active || current
          ? "border-[#111827] bg-white"
          : "border-transparent bg-transparent hover:bg-gray-100",
      ].join(" ")}
      onClick={onClick}
    >
      <div>{Icon}</div>
      <div className="text-[12px]">{label}</div>
    </button>
  );
}
