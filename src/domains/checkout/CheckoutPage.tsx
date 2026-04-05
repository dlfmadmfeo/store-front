"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import AlertModal from "@/components/AlertModal";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import NaverPayIcon from "@/components/icons/NaverPayIcon";
import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";

type PaymentMethod = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    title: "카드 간편결제",
    subtitle: "현대 Deep Dream 체크카드 8983",
    badge: "1% 적립",
  },
  {
    id: "bank",
    title: "계좌 간편결제",
    subtitle: "주거래 계좌로 바로 출금",
  },
  {
    id: "later",
    title: "나중결제",
    subtitle: "지금 구매, 다음 달 납부",
    badge: "30만원 한도",
  },
];

const formatPrice = (value: number) => `${value.toLocaleString()}원`;

export default function CheckoutPage() {
  const products = useCartStore((state) => state.products);
  const address = useAddressStore((state) => state.selectedAddress());
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  const [useAllPoints, setUseAllPoints] = useState(true);
  const [agreed, setAgreed] = useState(true);
  const [isOrderCompleteOpen, setIsOrderCompleteOpen] = useState(false);

  const selectedProducts = useMemo(
    () => products.filter((product) => product.checked && product.options.length > 0),
    [products],
  );

  const summary = useMemo(() => {
    const productOriginalAmount = selectedProducts.reduce(
      (sum, product) =>
        sum +
        product.options.reduce(
          (optionSum, option) => optionSum + option.unitOriginalPrice * option.count,
          0,
        ),
      0,
    );

    const productSaleAmount = selectedProducts.reduce(
      (sum, product) =>
        sum +
        product.options.reduce(
          (optionSum, option) => optionSum + option.unitSalePrice * option.count,
          0,
        ),
      0,
    );

    const couponDiscount = Math.min(270000, Math.floor(productSaleAmount * 0.18));
    const availablePoints = 4587;
    const usedPoints = useAllPoints
      ? Math.min(availablePoints, productSaleAmount - couponDiscount)
      : 0;
    const shippingFee = 0;
    const totalAmount = Math.max(productSaleAmount - couponDiscount - usedPoints + shippingFee, 0);
    const purchasePoint = Math.floor(totalAmount * 0.01);
    const reviewPoint = Math.min(selectedProducts.length * 3300, 3300);

    return {
      productOriginalAmount,
      productSaleAmount,
      couponDiscount,
      usedPoints,
      shippingFee,
      totalAmount,
      availablePoints,
      purchasePoint,
      reviewPoint,
      maxBenefit: purchasePoint + reviewPoint,
    };
  }, [selectedProducts, useAllPoints]);

  const handleSubmit = () => {
    if (!selectedProducts.length || !agreed) {
      return;
    }

    setIsOrderCompleteOpen(true);
  };

  return (
    <>
      <section className="bg-[#f5f6f8] pb-52 sm:pb-44">
        <div className="border-b border-black/5 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:grid lg:h-[74px] lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4 lg:py-0">
            <div className="hidden lg:block" />
            <h1 className="text-center text-[22px] font-black tracking-[-0.03em] text-[#111827] sm:text-[24px]">
              주문/결제
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[12px] text-[#98a2b3] sm:text-[13px] lg:justify-end">
              <span className="rounded-[8px] bg-[#f2f4f7] px-3 py-1">장바구니</span>
              <span>&gt;</span>
              <span className="rounded-[8px] bg-[#111827] px-3 py-1 font-bold text-white">
                주문/결제
              </span>
              <span>&gt;</span>
              <span className="rounded-[8px] bg-[#f2f4f7] px-3 py-1">완료</span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1120px] gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7 lg:py-10">
          <div className="space-y-6">
            <CheckoutSection title="배송지">
              <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-[20px] font-black tracking-[-0.03em] text-[#111827] sm:text-[22px]">
                      {address?.recipient ?? "기본 배송지 없음"}
                    </div>
                    <div className="mt-3 text-[15px] text-[#344054]">
                      {address?.phone ?? "로그인 후 배송지를 선택해 주세요."}
                      <span className="ml-2 rounded-[8px] bg-[#f2f4f7] px-2 py-1 text-[12px] text-[#667085]">
                        연락처 사용
                      </span>
                    </div>
                    <div className="mt-4 text-[15px] leading-7 text-[#111827]">
                      {address
                        ? `${address.roadAddress} ${address.detailAddress ?? ""}`.trim()
                        : "서울특별시 성북구 길음로길 40 (길음동 삼성래미안) 108동 1602호"}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-[6px] border border-[#d0d5dd] bg-[#fcfcfd] px-3.5 py-2 text-[14px] font-semibold text-[#344054] transition hover:bg-[#f8fafc] sm:w-auto"
                  >
                    변경
                  </button>
                </div>

                <div className="mt-6 overflow-hidden rounded-[10px] border border-[#d0d5dd] bg-[#fcfcfd]">
                  <div className="flex items-center justify-between border-b border-[#eaecf0] bg-white px-4 py-3.5 text-[15px] text-[#344054]">
                    <span>요청사항 직접 입력하기</span>
                    <span>
                      <ChevronDownIcon className="w-6" />
                    </span>
                  </div>
                  <div className="px-4 py-4 text-[15px] leading-7 text-[#475467]">
                    문 앞에 놓아주세요.
                    <br />
                    1층 공동현관 비밀번호 ****
                  </div>
                </div>

                <label className="mt-5 flex items-center gap-2 text-[15px] font-medium text-[#344054]">
                  <CheckCircleIcon checked className="h-5 w-5" />
                  다음에도 이 배송지 사용하기
                </label>
              </div>
            </CheckoutSection>

            <CheckoutSection title="주문상품">
              <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
                {selectedProducts.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-[10px] border border-[#e5e7eb] bg-white p-4 not-last:mb-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-2 text-[14px] font-semibold text-[#667085] sm:flex-row sm:items-start sm:justify-between">
                      <span className="tracking-[0.02em]">{product.storeName}</span>
                      <span className="w-fit rounded-[8px] bg-[#f2f4f7] px-3 py-1 text-[12px]">
                        무료 배송
                      </span>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-[120px] w-full overflow-hidden rounded-[10px] bg-[#f2f4f7] shadow-inner sm:h-[96px] sm:w-[96px] sm:shrink-0">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.productName}
                            fill
                            sizes="(max-width: 640px) 100vw, 92px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[18px] leading-7 tracking-[-0.03em] text-[#111827] sm:text-[20px] sm:leading-8">
                          <span className="mr-2 inline-flex items-center gap-1 rounded-[999px] bg-[#03c75a] px-2.5 py-1 text-[11px] font-bold text-white">
                            <NaverPayIcon />
                            plus
                          </span>
                          {product.productName}
                        </div>

                        <div className="mt-4 rounded-[8px] bg-[#f8fafc] px-4 py-4">
                          {product.options.map((option) => (
                            <div
                              key={option.id}
                              className="flex flex-col gap-1 py-2 text-[14px] text-[#475467] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-1 sm:text-[15px]"
                            >
                              <span>
                                옵션 {option.name} {option.count}개
                              </span>
                              <div className="shrink-0 sm:text-right">
                                <span className="mr-2 text-[#98a2b3] line-through">
                                  {formatPrice(option.unitOriginalPrice * option.count)}
                                </span>
                                <span className="text-[16px] font-bold text-[#111827]">
                                  {formatPrice(option.unitSalePrice * option.count)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </CheckoutSection>

            <CheckoutSection title="할인/쿠폰">
              <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 text-[18px] font-semibold text-[#111827]">
                    <span>할인/쿠폰</span>
                    <span className="rounded-[8px] border border-[#d0d5dd] bg-[#fcfcfd] px-3 py-1 text-[14px] text-[#344054]">
                      변경
                    </span>
                  </div>
                  <div className="text-[20px] font-bold text-[#1570ef]">
                    -{formatPrice(summary.couponDiscount)}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 rounded-[10px] border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
                  <span className="text-[16px] font-semibold text-[#111827]">총 주문금액</span>
                  <span className="text-[24px] font-black text-[#03c75a] sm:text-[28px]">
                    {formatPrice(summary.productSaleAmount - summary.couponDiscount)}
                  </span>
                </div>
              </div>
            </CheckoutSection>

            <CheckoutSection title="N pay 포인트/머니">
              <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="flex items-center justify-between text-[18px] font-semibold text-[#111827]">
                  <span>사용 가능</span>
                  <span>{formatPrice(summary.availablePoints)}</span>
                </div>

                <div className="mt-4 rounded-[8px] border border-[#eaecf0] bg-[#fcfcfd] p-4">
                  <div className="flex items-center justify-between text-[15px] text-[#475467]">
                    <span>포인트</span>
                    <span>{formatPrice(63)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[15px] text-[#475467]">
                    <span>머니</span>
                    <span>{formatPrice(summary.availablePoints - 63)}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-[56px] flex-1 items-center rounded-[8px] border border-[#d0d5dd] bg-[#fcfcfd] px-4 text-[22px] font-bold text-[#03c75a] sm:text-[24px]">
                    {formatPrice(summary.usedPoints)}
                  </div>
                  <button
                    type="button"
                    className="h-[56px] cursor-pointer rounded-[8px] border border-[#b7e4c7] bg-[#f3fbf5] px-5 text-[16px] font-bold text-[#067647] sm:h-auto"
                    onClick={() => setUseAllPoints((prev) => !prev)}
                  >
                    {useAllPoints ? "사용해제" : "전액사용"}
                  </button>
                </div>

                <label className="mt-5 flex items-center gap-2 text-[15px] text-[#475467]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-naver"
                    checked={useAllPoints}
                    onChange={(event) => setUseAllPoints(event.target.checked)}
                  />
                  보유 금액 전액 사용
                </label>
              </div>
            </CheckoutSection>

            <CheckoutSection title="결제수단" rightValue={formatPrice(summary.totalAmount)}>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const checked = selectedPaymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      className={`w-full cursor-pointer rounded-[12px] border bg-white p-4 text-left transition sm:p-5 ${
                        checked
                          ? "border-[#03c75a] bg-[#fbfefc] shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
                          : "border-[#e5e7eb] shadow-[0_6px_18px_rgba(15,23,42,0.04)] hover:border-[#cfd8e3]"
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon checked={checked} className="mt-1 h-5 w-5 shrink-0" />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[17px] font-bold text-[#111827] sm:text-[18px]">
                              {method.title}
                            </span>
                            {method.badge ? (
                              <span className="rounded-[999px] border border-[#cfead8] bg-[#f5fbf7] px-2.5 py-1 text-[12px] font-bold text-[#03c75a]">
                                {method.badge}
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-3 rounded-[8px] bg-[#f8fafc] px-4 py-4 text-[15px] text-[#475467]">
                            {method.subtitle}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-5 text-[15px] text-[#475467] shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                  개인정보 제공 동의 및 혜택 상세보기
                  <div className="mt-3 text-[#98a2b3]">구매안전 서비스 안내</div>
                </div>
              </div>
            </CheckoutSection>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-[18px] font-black tracking-[-0.02em] text-[#111827]">
                  적립 혜택
                </h2>
                <span className="text-[16px] font-black text-[#03c75a]">
                  최대 {formatPrice(summary.maxBenefit)}
                </span>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-[17px] font-bold text-[#111827]">
                    <span>구매 적립</span>
                    <span>총 {formatPrice(summary.purchasePoint)}</span>
                  </div>
                  <div className="mt-2 border-l-4 border-[#eaecf0] pl-3 text-[15px] text-[#667085]">
                    기본 적립 {formatPrice(summary.purchasePoint)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[17px] font-bold text-[#111827]">
                    <span>리뷰 적립</span>
                    <span>최대 {formatPrice(summary.reviewPoint)}</span>
                  </div>
                  <div className="mt-2 text-[14px] leading-6 text-[#667085]">
                    동일 상품의 상품/포토리뷰 적립은 각 1회로 제한됩니다.
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-[#eaecf0] pt-4 text-[16px] font-bold text-[#03c75a] sm:flex-row sm:items-center sm:justify-between">
                <span>구매 감사 추가 적립</span>
                <span>+{formatPrice(summary.maxBenefit + 2700)}</span>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <div className="text-[16px] font-bold text-[#111827]">
                브랜드 혜택이 함께 적용돼요
              </div>
              <div className="mt-2 text-[15px] font-semibold text-[#067647]">
                멤버십 적용 시 100% 적립 이벤트
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e5e7eb] bg-white/92 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <label className="flex items-start gap-3 text-[14px] text-[#475467] sm:items-center sm:text-[15px]">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-naver sm:mt-0"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            구매 및 주문 내용을 확인했으며, 정보 제공 약관에 동의합니다.
          </label>

          <button
            type="button"
            className={`h-[56px] w-full rounded-[8px] px-6 text-[17px] font-black transition sm:h-[58px] sm:min-w-[282px] sm:w-auto sm:px-8 sm:text-[18px] ${
              agreed
                ? "cursor-pointer bg-[#03c75a] text-white"
                : "cursor-not-allowed bg-[#cdd5df] text-white shadow-none"
            }`}
            onClick={handleSubmit}
            disabled={!agreed}
          >
            {formatPrice(summary.totalAmount)} 결제하기
          </button>
        </div>
      </div>

      <AlertModal
        open={isOrderCompleteOpen}
        title="결제 UI 데모가 준비되어 있어요"
        description="실제 서비스 흐름 전 단계로 결제 구조와 체크 포인트를 반영했습니다."
        confirmLabel="확인"
        onClose={() => setIsOrderCompleteOpen(false)}
      />
    </>
  );
}

function CheckoutSection({
  title,
  rightValue,
  children,
}: {
  title: string;
  rightValue?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[18px] font-black tracking-[-0.02em] text-[#111827]">{title}</h2>
        {rightValue ? (
          <span className="text-[16px] font-black text-[#03c75a]">{rightValue}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}
