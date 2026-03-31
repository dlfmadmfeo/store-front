import Link from "next/link";
import Image from "next/image";
import MyShoppingMobileNav from "./MyShoppingMobileNav";
import MyShoppingShell from "./MyShoppingShell";
import {
  MyShoppingCardSkeleton,
  MyShoppingEmptyState,
  MyShoppingErrorState,
} from "./MyShoppingStates";
import type { MyShoppingHomeData } from "./types";

export default function MyShopping({
  data,
  error,
}: {
  data: MyShoppingHomeData | null;
  error?: string | null;
}) {
  const isLoading = false;

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
      <div className="space-y-4 md:space-y-5">
        <section
          aria-labelledby="myshopping-profile-heading"
          className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="grid gap-px bg-gray-100 md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-5 bg-white px-4 py-5 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-300 sm:h-16 sm:w-16 sm:text-3xl"
                >
                  MY
                </div>
                <div>
                  <p className="text-[14px] text-gray-500">{data.profile.profileLabel}</p>
                  <h1
                    id="myshopping-profile-heading"
                    className="mt-1 text-[22px] font-bold tracking-[-0.02em] text-gray-900 sm:text-[28px]"
                  >
                    {data.profile.userName}
                  </h1>
                </div>
              </div>

              <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap">
                <button className="rounded-[999px] border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
                  설정
                </button>
                <button className="rounded-[999px] border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2">
                  맞춤 정보 관리
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 bg-white px-4 py-5 sm:px-8 sm:py-7">
              <div>
                <div className="text-[14px] font-semibold text-gray-500">{data.profile.rewardLabel}</div>
                <div className="mt-2 text-[22px] font-bold text-gray-900 sm:text-[28px]">
                  {data.profile.rewardValue}
                </div>
              </div>
              <div className="shrink-0 rounded-[999px] bg-[#00de5a] px-3 py-2 text-[13px] font-semibold text-white sm:px-4 sm:text-[14px]">
                {data.profile.benefitLabel}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="myshopping-shortcuts-heading"
          className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="border-b border-gray-100 px-4 py-4 sm:px-8 sm:py-5">
            <div className="inline-flex items-center gap-2 rounded-[999px] bg-[#f3fdf8] px-3 py-1 text-[13px] font-semibold text-[#09a561]">
              <span className="rounded bg-[#09a561] px-1.5 py-0.5 text-white">N+</span>
              멤버십 시작하고 모든 혜택을 누리세요!
            </div>
            <h2 id="myshopping-shortcuts-heading" className="sr-only">
              마이쇼핑 빠른 메뉴
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px bg-gray-100 md:grid-cols-4">
            {data.quickLinks.slice(0, 4).map((item) => (
              item.path ? (
                <Link
                  key={item.title}
                  href={item.path}
                  className="flex min-h-[108px] flex-col items-center justify-center gap-2 bg-white px-3 py-5 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#09aa5c] sm:min-h-[124px] sm:px-4 sm:py-6"
                  aria-label={`${item.title} 바로가기`}
                >
                  <div className="text-sm font-black tracking-[0.18em] text-gray-700">{item.icon}</div>
                  <div className="text-[14px] font-medium text-gray-900 sm:text-[15px]">{item.title}</div>
                </Link>
              ) : (
                <div
                  key={item.title}
                  className="flex min-h-[108px] flex-col items-center justify-center gap-2 bg-white px-3 py-5 text-center sm:min-h-[124px] sm:px-4 sm:py-6"
                >
                  <div className="text-sm font-black tracking-[0.18em] text-gray-700">{item.icon}</div>
                  <div className="text-[14px] font-medium text-gray-900 sm:text-[15px]">{item.title}</div>
                </div>
              )
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-4 px-4 py-5 sm:px-8 sm:py-7 md:grid-cols-4 md:gap-y-5">
            {data.quickLinks.slice(4).map((item) => (
              <button
                key={item.title}
                type="button"
                className="flex items-center gap-3 text-left text-[14px] text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 sm:text-[15px]"
                aria-label={item.title}
              >
                <span className="text-[11px] font-black tracking-[0.2em] text-gray-500">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="liked-products-heading"
          className="rounded-[16px] bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:px-8 sm:py-7"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2
              id="liked-products-heading"
              className="text-[20px] font-bold tracking-[-0.02em] text-gray-900 sm:text-[22px]"
            >
              찜한 상품
            </h2>
            <button className="shrink-0 text-[14px] font-medium text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2 sm:text-[15px]">
              전체보기 &gt;
            </button>
          </div>

          {data.likedProducts.length === 0 ? (
            <MyShoppingEmptyState
              title="찜한 상품이 아직 없습니다"
              description="관심 있는 상품을 저장하면 이곳에서 빠르게 다시 확인할 수 있습니다."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {data.likedProducts.map((product) => (
                <article key={product.id}>
                  <div
                    className={`relative h-[200px] overflow-hidden rounded-[14px] bg-gradient-to-br ${product.accent} sm:h-[220px]`}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute left-3 top-3 rounded-[999px] bg-white/85 px-2.5 py-1 text-[12px] font-semibold text-[#ff5b3d]">
                      {product.badge}
                    </div>
                    <div className="absolute inset-x-4 bottom-4 rounded-[12px] border border-white/60 bg-white/30 p-4 backdrop-blur-sm sm:inset-x-6 sm:bottom-5">
                      <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-gray-700">
                        {product.brand}
                      </div>
                      <div className="mt-2 text-[17px] font-semibold leading-snug text-gray-900 sm:text-[18px]">
                        {product.title}
                      </div>
                    </div>
                  </div>

                  <div className="px-1 pb-1 pt-3">
                    <div className="line-clamp-2 text-[15px] leading-6 text-gray-700">{product.title}</div>
                    <div className="mt-2 text-[20px] font-bold tracking-[-0.02em] text-gray-900 sm:text-[21px]">
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
