"use client";

import DeleteIcon from "@/components/icons/DeleteIcon";
import { useCartStore } from "@/store/useCartStore";
import { useAddressStore } from "@/store/useAddressStore";
import GpsIcon from "@/components/icons/GpsIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

export default function CartTopBar() {
  const products = useCartStore((s) => s.products);
  const toggleAll = useCartStore((s) => s.toggleAll);
  const removeSelected = useCartStore((s) => s.removeSelected);

  const addresses = useAddressStore((s) => s.addresses);
  const selectedAddressId = useAddressStore((s) => s.selectedAddressId);

  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? null;

  const allChecked = products.length > 0 && products.every((p) => p.checked);
  const selectedCount = products.filter((p) => p.checked).length;

  return (
    <div className="bg-white">
      {/* 상단 제목 */}
      <div className="mx-auto max-w-[1280px] px-2 pt-8 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[18px] md:text-[20px]">
            <strong className="font-bold text-black">일반배송 2</strong>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">컬리마트 · 지금배달 0</span>
          </div>

          <div className="hidden md:flex items-center gap-2 whitespace-nowrap text-[14px]">
            <span className="font-semibold text-black">장바구니</span>
            <span className="text-gray-300">
              <ChevronRightIcon />
            </span>
            <span className="text-gray-400">주문/결제</span>
            <span className="text-gray-300">
              <ChevronRightIcon />
            </span>
            <span className="text-gray-400">완료</span>
          </div>
        </div>
      </div>

      {/* 배송지 */}
      <div className="mx-auto max-w-[1280px] px-2 pb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex min-h-[48px] flex-1 items-center rounded-[8px] bg-[#f7f8fa] px-4 text-[14px] text-gray-700">
            <span className="mr-2 text-[16px]">
              <GpsIcon />
            </span>

            {selectedAddress ? (
              <>
                <span className="font-semibold text-black">
                  배송지 : {selectedAddress.recipient}
                </span>
                <span className="ml-2 text-gray-500">
                  {selectedAddress.roadAddress} {selectedAddress.detailAddress}
                </span>
                <button className="ml-3 rounded-[4px] border border-gray-300 bg-white px-2 py-[2px] text-[12px] text-gray-700 hover:bg-gray-50">
                  변경
                </button>
              </>
            ) : (
              <span className="text-gray-500">배송지를 등록해주세요.</span>
            )}
          </div>

          <div className="flex min-h-[48px] items-center rounded-[8px] bg-[#f7f8fa] px-4 text-[13px] text-gray-500">
            <span className="mr-2 font-bold text-green-500">N</span>
            <span>등록한 배송지 기준 빠른배송 상품을 보실 수 있습니다.</span>
          </div>
        </div>
      </div>

      {/* 전체 선택 */}
      <div className="sticky top-0 z-10 border-t border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-2 py-4">
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-[15px] font-semibold text-black">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => toggleAll(e.target.checked)}
                className="h-[18px] w-[18px] rounded border-gray-300"
              />
              <span>전체 선택 ({selectedCount})</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={removeSelected}
                className="flex items-center rounded-[4px] border border-gray-300 px-3 py-[7px] text-[12px] text-gray-700 hover:bg-gray-50"
              >
                <DeleteIcon />
                <span className="ml-1">선택 삭제</span>
              </button>

              <button className="rounded-[4px] border border-gray-300 px-3 py-[7px] text-[12px] text-gray-700 hover:bg-gray-50">
                주문불가삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
