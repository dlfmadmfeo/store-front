"use client";

import { useState } from "react";
import AlertModal from "@/components/AlertModal";
import { useCartStore } from "@/store/useCartStore";

export default function CartAside() {
  const totalOriginalPrice = useCartStore((s) => s.totalOriginalPrice());
  const totalSalePrice = useCartStore((s) => s.totalSalePrice());
  const totalDiscount = useCartStore((s) => s.totalDiscount());
  const selectedCount = useCartStore((s) => s.selectedCount());
  const [isEmptyOrderModalOpen, setIsEmptyOrderModalOpen] = useState(false);

  const handleOrderClick = () => {
    if (selectedCount === 0) {
      setIsEmptyOrderModalOpen(true);
      return;
    }
  };

  return (
    <>
      <aside
        aria-label="주문 예상 금액"
        className="my-2 w-full shrink-0 rounded-lg bg-white p-4 md:w-[360px]"
      >
        <div className="text-[18px] font-bold">주문 예상 금액</div>

        <div className="mt-4 space-y-2 text-[14px]">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">총 선택상품금액</span>
            <span className="font-semibold">{totalOriginalPrice.toLocaleString()}원</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">즉시할인 예상금액</span>
            <span className="font-semibold text-[#d40022]">-{totalDiscount.toLocaleString()}원</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">쿠폰할인 예상금액</span>
            <span className="font-semibold text-[#d40022]">0원</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">총 배송비</span>
            <span className="font-semibold">0원</span>
          </div>
        </div>

        <hr className="my-4 text-gray-200" />

        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold">총 주문 예상 금액</span>
          <span className="text-[18px] font-extrabold">{totalSalePrice.toLocaleString()}원</span>
        </div>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-naver text-[16px] font-bold text-white"
            onClick={handleOrderClick}
            aria-label={`주문하기, 선택 상품 ${selectedCount}개`}
          >
            주문하기
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black text-[12px] font-extrabold leading-none">
              {selectedCount}
            </span>
          </button>

          <button
            type="button"
            className="h-[52px] w-full cursor-pointer rounded-[6px] border border-naver bg-white text-[16px] font-bold text-naver"
          >
            찜하기
          </button>
        </div>
      </aside>

      <AlertModal
        open={isEmptyOrderModalOpen}
        title="선택하신 상품이 없습니다."
        description="상품을 선택하신 후 주문해 주세요."
        confirmLabel="확인"
        onClose={() => setIsEmptyOrderModalOpen(false)}
      />
    </>
  );
}
