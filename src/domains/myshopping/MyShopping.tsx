"use client";

import { useRouter } from "next/navigation";
import MyShoppingMobileNav from "./MyShoppingMobileNav";
import MyShoppingShell from "./MyShoppingShell";
import {
  MyShoppingCardSkeleton,
  MyShoppingEmptyState,
  MyShoppingErrorState,
} from "./MyShoppingStates";
import { useMyShoppingHomeData } from "./useMyShoppingData";

export default function MyShopping() {
  const router = useRouter();
  const { data, isLoading, error } = useMyShoppingHomeData();

  if (error) {
    return (
      <MyShoppingShell mobileNavigation={<MyShoppingMobileNav />}>
        <MyShoppingErrorState message={error} />
      </MyShoppingShell>
    );
  }

  if (isLoading || !data) {
    return (
      <MyShoppingShell mobileNavigation={<MyShoppingMobileNav />}>
        <div className="space-y-5">
          <MyShoppingCardSkeleton lines={4} />
          <MyShoppingCardSkeleton lines={5} />
          <MyShoppingCardSkeleton lines={4} />
        </div>
      </MyShoppingShell>
    );
  }

  return (
    <MyShoppingShell mobileNavigation={<MyShoppingMobileNav />}>
      <div className="space-y-5">
        <section
          aria-labelledby="myshopping-profile-heading"
          className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="grid gap-px bg-gray-100 md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-5 bg-white px-5 py-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-300"
                >
                  MY
                </div>
                <div>
                  <p className="text-[14px] text-gray-500">{data.profile.profileLabel}</p>
                  <h1
                    id="myshopping-profile-heading"
                    className="mt-1 text-[24px] font-bold tracking-[-0.02em] text-gray-900 sm:text-[28px]"
                  >
                    {data.profile.userName}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="rounded-[999px] border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
                  {"\uC124\uC815"}
                </button>
                <button className="rounded-[999px] border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
                  {"\uB9DE\uCDA4 \uC815\uBCF4 \uAD00\uB9AC"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white px-5 py-6 sm:px-8 sm:py-7">
              <div>
                <div className="text-[14px] font-semibold text-gray-500">{data.profile.rewardLabel}</div>
                <div className="mt-2 text-[24px] font-bold text-gray-900 sm:text-[28px]">
                  {data.profile.rewardValue}
                </div>
              </div>
              <div className="rounded-[999px] bg-[#00de5a] px-4 py-2 text-[14px] font-semibold text-white">
                {data.profile.benefitLabel}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="myshopping-shortcuts-heading"
          className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
            <div className="inline-flex items-center gap-2 rounded-[999px] bg-[#f3fdf8] px-3 py-1 text-[13px] font-semibold text-[#09a561]">
              <span className="rounded bg-[#09a561] px-1.5 py-0.5 text-white">N+</span>
              {"\uBA64\uBC84\uC2ED \uC2DC\uC791\uD558\uACE0 \uBAA8\uB4E0 \uD61C\uD0DD\uC744 \uB204\uB9AC\uC138\uC694!"}
            </div>
            <h2
              id="myshopping-shortcuts-heading"
              className="sr-only"
            >
              마이쇼핑 빠른 메뉴
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px bg-gray-100 md:grid-cols-4">
            {data.quickLinks.slice(0, 4).map((item) => (
              <button
                key={item.title}
                type="button"
                className="flex flex-col items-center gap-2 bg-white px-4 py-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#09aa5c]"
                onClick={() => {
                  if (item.path) {
                    router.push(item.path);
                  }
                }}
              >
                <div className="text-sm font-black tracking-[0.18em] text-gray-700">{item.icon}</div>
                <div className="text-[15px] font-medium text-gray-900">{item.title}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-5 px-5 py-7 sm:px-8 md:grid-cols-4">
            {data.quickLinks.slice(4).map((item) => (
              <button
                key={item.title}
                type="button"
                className="flex items-center gap-3 text-left text-[15px] text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
              >
                <span className="text-[11px] font-black tracking-[0.2em] text-gray-500">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="liked-products-heading"
          className="rounded-[16px] bg-white px-5 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:px-8 sm:py-7"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2
              id="liked-products-heading"
              className="text-[22px] font-bold tracking-[-0.02em] text-gray-900"
            >
              {"\uCC1C\uD55C \uC0C1\uD488"}
            </h2>
            <button className="text-[15px] font-medium text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
              {"\uC804\uCCB4\uBCF4\uAE30 >"}
            </button>
          </div>

          {data.likedProducts.length === 0 ? (
            <MyShoppingEmptyState
              title="찜한 상품이 아직 없어요"
              description="관심 있는 상품을 저장하면 이곳에서 빠르게 다시 확인할 수 있습니다."
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {data.likedProducts.map((product) => (
                <article key={product.id}>
                  <div
                    className={`relative h-[220px] overflow-hidden rounded-[14px] bg-gradient-to-br ${product.accent}`}
                  >
                    <div className="absolute left-3 top-3 rounded-[999px] bg-white/85 px-2.5 py-1 text-[12px] font-semibold text-[#ff5b3d]">
                      {product.badge}
                    </div>
                    <div className="absolute inset-x-6 bottom-5 rounded-[12px] border border-white/60 bg-white/30 p-4 backdrop-blur-sm">
                      <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-gray-700">
                        {product.brand}
                      </div>
                      <div className="mt-2 text-[18px] font-semibold leading-snug text-gray-900">
                        {product.title}
                      </div>
                    </div>
                  </div>

                  <div className="px-1 pb-1 pt-3">
                    <div className="line-clamp-2 text-[15px] leading-6 text-gray-700">{product.title}</div>
                    <div className="mt-2 text-[21px] font-bold tracking-[-0.02em] text-gray-900">
                      {product.priceLabel}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </MyShoppingShell>
  );
}
