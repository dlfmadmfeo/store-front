"use client";

import { InlineErrorState, SectionSkeleton } from "@/components/common/SectionSkeleton";
import CartAside from "./CartAside";
import { useCartData } from "./hooks/useCartData";
import CartEmpty from "./CartEmpty";
import CartMain from "./CartMain";
import CartTopBar from "./CartTopBar";

export default function Cart() {
  const { products, isLoading, error } = useCartData();

  return (
    <>
      <hr className="py-0 text-gray-200" />
      <CartTopBar />

      <div className="content bg-[#f1f4f6]">
        <div className="mx-auto max-w-[1280px] gap-[20px] p-2 md:flex md:justify-between">
          {error ? (
            <div className="w-full py-4">
              <InlineErrorState
                title="장바구니를 불러오지 못했습니다"
                description={error}
              />
            </div>
          ) : isLoading ? (
            <div className="w-full space-y-4 py-4">
              <SectionSkeleton lines={5} />
              <SectionSkeleton lines={5} />
            </div>
          ) : products.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <CartMain />
              <CartAside />
            </>
          )}
        </div>
      </div>
    </>
  );
}
