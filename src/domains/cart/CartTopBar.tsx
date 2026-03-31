"use client";

import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import GpsIcon from "@/components/icons/GpsIcon";
import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";

export default function CartTopBar() {
  const products = useCartStore((s) => s.products);
  const toggleAll = useCartStore((s) => s.toggleAll);
  const removeSelected = useCartStore((s) => s.removeSelected);

  const addresses = useAddressStore((s) => s.addresses);
  const selectedAddressId = useAddressStore((s) => s.selectedAddressId);

  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? null;

  const allChecked = products.length > 0 && products.every((product) => product.checked);
  const selectedCount = products.filter((product) => product.checked).length;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1280px] px-2 pb-5 pt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[18px] md:text-[20px]">
            <strong className="font-bold text-black">일반배송 {products.length}</strong>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">오늘출발 상품 {selectedCount}</span>
          </div>

          <nav
            aria-label="주문 진행 단계"
            className="hidden items-center gap-2 whitespace-nowrap text-[14px] md:flex"
          >
            <span className="font-semibold text-black">장바구니</span>
            <span className="text-gray-300">
              <ChevronRightIcon />
            </span>
            <span className="text-gray-400">주문/결제</span>
            <span className="text-gray-300">
              <ChevronRightIcon />
            </span>
            <span className="text-gray-400">완료</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-2 pb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex min-h-[48px] flex-1 items-center rounded-[8px] bg-[#f7f8fa] px-4 text-[14px] text-gray-700">
            <span className="mr-2 text-[16px]" aria-hidden="true">
              <GpsIcon />
            </span>

            {selectedAddress ? (
              <>
                <span className="font-semibold text-black">배송지 : {selectedAddress.recipient}</span>
                <span className="ml-2 text-gray-500">
                  {selectedAddress.roadAddress} {selectedAddress.detailAddress}
                </span>
                <button className="ml-3 rounded-[4px] border border-gray-300 bg-white px-2 py-[2px] text-[12px] text-gray-700 hover:bg-gray-50">
                  변경
                </button>
              </>
            ) : (
              <span className="text-gray-500">배송지를 등록해 주세요.</span>
            )}
          </div>

          <div className="flex min-h-[48px] items-center rounded-[8px] bg-[#f7f8fa] px-4 text-[13px] text-gray-500">
            <span className="mr-2 font-bold text-green-500">N</span>
            <span>등록한 배송지 기준으로 빠른배송 상품을 보여드리고 있습니다.</span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 border-b border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-2 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-[15px] font-semibold text-black">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(event) => toggleAll(event.target.checked)}
                className="h-[18px] w-[18px] rounded border-gray-300"
                aria-label="전체 상품 선택"
              />
              <span>전체 선택 ({selectedCount})</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={removeSelected}
                className="flex items-center rounded-[4px] border border-gray-300 px-3 py-[7px] text-[12px] text-gray-700 hover:bg-gray-50"
              >
                <DeleteIcon />
                <span className="ml-1">선택 삭제</span>
              </button>

              <button
                type="button"
                className="rounded-[4px] border border-gray-300 px-3 py-[7px] text-[12px] text-gray-700 hover:bg-gray-50"
              >
                주문 옵션 관리
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
