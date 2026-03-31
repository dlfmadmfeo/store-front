"use client";

import Image from "next/image";
import { memo } from "react";
import { useShallow } from "zustand/react/shallow";
import CouponIcon from "@/components/icons/CouponIcon";
import { useCartStore } from "@/store/useCartStore";
import type { CartProduct } from "@/lib/types/cart";

export default function CartMain() {
  const productIds = useCartStore(useShallow((s) => s.products.map((product) => product.id)));
  const totalPrice = useCartStore((s) => s.totalPrice);

  return (
    <section aria-label="장바구니 상품 목록" className="card-main w-full">
      {productIds.map((productId, index) => (
        <CartProductCard
          key={productId}
          productId={productId}
          isLast={index === productIds.length - 1}
        />
      ))}

      <hr className="my-4 text-gray-200" />

      <div className="rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-[14px] text-gray-500">총 배송비</div>
          <div className="text-[14px] font-semibold text-blue-600">무료</div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-[15px] font-bold">예상 주문금액</div>
          <div className="text-[18px] font-extrabold">{totalPrice().toLocaleString()}원</div>
        </div>
      </div>
    </section>
  );
}

const CartProductCard = memo(function CartProductCard({
  productId,
  isLast,
}: {
  productId: number;
  isLast: boolean;
}) {
  const product = useCartStore((s) => s.products.find((item) => item.id === productId)) as CartProduct;
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeOption = useCartStore((s) => s.removeOption);
  const toggleProduct = useCartStore((s) => s.toggleProduct);

  const discountRate =
    product.originalPrice > 0
      ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
      : 0;
  const productTotalPrice = product.options.reduce(
    (sum, option) => sum + option.unitSalePrice * option.count,
    0,
  );

  return (
    <article className="mt-2 w-full rounded-lg bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] accent-naver"
            checked={product.checked}
            onChange={() => toggleProduct(product.id)}
            aria-label={`${product.storeName} 상품 선택`}
          />
          <span className="text-[17px] font-extrabold tracking-tight sm:text-[18px]">
            {product.storeName}
          </span>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center rounded-[6px] border border-[#d40022] bg-[rgba(212,0,34,.08)] px-3 py-2 text-[12px] font-bold text-[#d40022] sm:w-[96px]"
        >
          <CouponIcon />
          <span className="ml-1">쿠폰받기</span>
        </button>
      </div>

      <hr className="my-3 text-gray-200" />

      <div className="flex gap-3">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[10px] bg-gray-200">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.productName}
              fill
              sizes="88px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[12px] text-gray-500">
              IMG
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[14px]">
            <span className="font-bold text-naver">오늘출발</span>
            <span className="text-gray-700">{product.shippingText ?? "오늘출발 기준 배송 예정"}</span>
          </div>

          <div className="mt-2 text-[14px] leading-5 text-gray-900">
            <div className="flex min-w-0 items-center gap-1">
              <span className="shrink-0 rounded bg-naver/10 px-1.5 py-0.5 text-[11px] font-bold text-naver">
                Npay
              </span>
              <span className="block min-w-0 truncate">{product.productName}</span>
            </div>
          </div>

          <div className="mt-2">
            <div className="text-[12px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}원
            </div>
            <div className="flex items-end gap-2">
              <span className="text-[16px] font-extrabold text-[#d40022]">{discountRate}%</span>
              <span className="text-[20px] font-extrabold">{product.salePrice.toLocaleString()}원</span>
            </div>
            <div className="mt-1 text-[12px] text-gray-500">회원가 이상 혜택</div>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {product.options.map((option) => (
          <div key={option.id} className="rounded-[10px] bg-gray-100 px-3 py-3">
            <div className="flex flex-col gap-3 py-1 md:flex-row md:items-center md:justify-between">
              <div className="text-[14px] text-gray-900">{option.name}</div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:flex sm:gap-3">
                <div
                  className="inline-flex items-center overflow-hidden rounded-[6px] border border-gray-300 bg-white"
                  aria-label={`${option.name} 수량 조절`}
                >
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center text-[18px] text-gray-700"
                    onClick={() => decrease(product.id, option.id)}
                    aria-label={`${option.name} 수량 감소`}
                  >
                    -
                  </button>
                  <div className="flex h-8 w-10 items-center justify-center text-[14px] font-bold">
                    {option.count}
                  </div>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center text-[18px] text-gray-700"
                    onClick={() => increase(product.id, option.id)}
                    aria-label={`${option.name} 수량 증가`}
                  >
                    +
                  </button>
                </div>

                <div className="text-right font-semibold sm:w-[90px]">
                  {(option.unitSalePrice * option.count).toLocaleString()}원
                </div>

                <button
                  type="button"
                  className="h-8 w-8 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => removeOption(product.id, option.id)}
                  aria-label={`${option.name} 삭제`}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 h-[44px] w-full rounded-[8px] border border-gray-200 bg-white text-[14px] font-semibold"
      >
        옵션 변경
      </button>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-[14px] text-gray-500">상품 합계</div>
        <div className="text-[16px] font-bold">{productTotalPrice.toLocaleString()}원</div>
      </div>

      {!isLast ? <hr className="my-4 text-gray-200" /> : null}
    </article>
  );
});
