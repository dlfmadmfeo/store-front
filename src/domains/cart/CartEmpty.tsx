import CartIcon from "@/components/icons/CartIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import { useRouter } from "next/navigation";

export default function CartEmpty() {
  const router = useRouter();
  return (
    <>
      <div className="bg-white p-2 rounded-xl w-full h-[420px] flex justify-center my-4">
        <div className="flex flex-col items-center justify-center">
          <CartIcon
            active={false}
            size={64}
          />
          <div className="text-center py-3">
            <div className="text-[18px] font-bold">장바구니에 담긴 상품이 없습니다.</div>
            <div className="text-gray-800 text-[14px]">원하는 상품을 장바구니에 담아보세요!</div>
          </div>
          <div className="mt-2">
            <button
              className="flex justify-between items-center bg-gray-100 rounded-2xl py-2 px-4 cursor-pointer hover:bg-gray-200 font-bold"
              onClick={() => router.push("/")}
            >
              <span className="mr-1 text-[14px]">쇼핑 계속하기</span>
              <RightArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
