import { useCartStore } from "@/store/useCartStore";

export default function CartAside() {
  const totalOriginalPrice = useCartStore((s) => s.totalOriginalPrice());
  const totalSalePrice = useCartStore((s) => s.totalSalePrice());
  const totalDiscount = useCartStore((s) => s.totalDiscount());

  return (
    <>
      <div className="card-aside bg-white rounded-lg p-4 md:w-[360px] w-full shrink-0 my-2">
        {/* 주문예상금액 */}
        <div className="order-predict-price">
          <div className="text-[18px] font-bold">주문 예상 금액</div>

          {/* 금액 리스트 */}
          <div className="mt-4 space-y-2 text-[14px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">총 선택상품금액</span>
              <span className="font-semibold">{totalOriginalPrice.toLocaleString()}원</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">즉시할인예상금액</span>
              <span className="font-semibold text-[#d40022]">
                -{totalDiscount.toLocaleString()}원
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">쿠폰할인예상금액</span>
              <span className="font-semibold text-[#d40022]">0원</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">총 배송비</span>
              <span className="font-semibold">0원</span>
            </div>
          </div>

          <hr className="my-4 text-gray-200" />

          {/* 총 주문 예상 금액 */}
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-bold">총 주문 예상 금액</span>
            <span className="text-[18px] font-extrabold">{totalSalePrice.toLocaleString()}원</span>
          </div>

          {/* 버튼들 */}
          <div className="mt-5 space-y-3">
            <button className="w-full h-[52px] rounded-[6px] bg-naver text-white font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer">
              주문하기
              <span className="w-[20px] h-[20px] rounded-full bg-black text-[12px] font-extrabold flex items-center justify-center leading-none">
                1
              </span>
            </button>

            <button className="w-full h-[52px] rounded-[6px] border border-naver text-naver font-bold text-[16px] bg-white cursor-pointer">
              선물하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
