"use client";
import CartAside from "./CartAside";
import CartTopBar from "./CartTopBar";
import CartMain from "./CartMain";
import { useCartStore } from "@/store/useCartStore";
import CartEmpty from "./CartEmpty";

export default function Cart() {
  const products = useCartStore((s) => s.products);

  return (
    <>
      <hr className="py-0 text-gray-200" />
      {/* 탑 */}
      <CartTopBar />
      {/* 콘텐츠 영역 */}
      <div className="content bg-[#f1f4f6]">
        <div className="max-w-[1280px] mx-auto p-2 md:flex justify-between gap-[20px]">
          {products.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              {/* 메인 */}
              <CartMain />
              {/* 사이드 */}
              <CartAside />
            </>
          )}
        </div>
      </div>
    </>
  );
}
