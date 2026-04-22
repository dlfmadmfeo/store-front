"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AlertModal from "@/components/AlertModal";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import NaverPayIcon from "@/components/icons/NaverPayIcon";
import { useCheckoutData } from "@/domains/checkout/hooks/useCheckoutData";
import type { CartProduct } from "@/lib/types/cart";
import type { CheckoutFlowStatus, PaymentMethodId } from "@/lib/types/checkout";
import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";

type PaymentMethod = {
  id: PaymentMethodId;
  title: string;
  description: string;
  badge?: string;
};

type CheckoutDraft = {
  selectedPaymentMethod?: PaymentMethodId;
  useAllPoints?: boolean;
  agreed?: boolean;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    title: "카드 간편결제",
    description: "주 사용 카드로 빠르게 결제합니다.",
    badge: "기본",
  },
  {
    id: "bank",
    title: "계좌 간편결제",
    description: "본인 계좌에서 바로 출금합니다.",
  },
  {
    id: "later",
    title: "나중결제",
    description: "한도 내에서 다음 달에 결제합니다.",
    badge: "실험형",
  },
];

const CHECKOUT_DRAFT_KEY = "checkout-draft-v1";
const formatPrice = (value: number) => `${value.toLocaleString()}원`;

function getSelectedProducts(products: CartProduct[]) {
  return products.filter((product) => product.checked && product.options.length > 0);
}

function getSavedDraft(enabled: boolean): CheckoutDraft | null {
  if (!enabled || typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CheckoutDraft;
  } catch {
    window.sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    return null;
  }
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const products = useCartStore((state) => state.products);
  const address = useAddressStore((state) => state.selectedAddress());
  const isAppEntry = searchParams.get("entry") === "app";
  const initialDraft = getSavedDraft(isAppEntry);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId>(
    () => initialDraft?.selectedPaymentMethod ?? "card"
  );
  const [useAllPoints, setUseAllPoints] = useState(() => initialDraft?.useAllPoints ?? true);
  const [agreed, setAgreed] = useState(() => initialDraft?.agreed ?? true);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const selectedProducts = useMemo(() => getSelectedProducts(products), [products]);

  const {
    quote,
    isLoadingQuote,
    quoteError,
    reloadQuote,
    isSubmitting,
    submitError,
    submitResult,
    submit,
    canSubmit,
    flowStatus,
  } = useCheckoutData({
    selectedProducts,
    address,
    useAllPoints,
    selectedPaymentMethod,
    source: isAppEntry ? "app" : "web",
    agreed,
  });

  useEffect(() => {
    if (!isAppEntry) {
      return;
    }

    window.sessionStorage.setItem(
      CHECKOUT_DRAFT_KEY,
      JSON.stringify({
        selectedPaymentMethod,
        useAllPoints,
        agreed,
      } satisfies CheckoutDraft)
    );
  }, [agreed, isAppEntry, selectedPaymentMethod, useAllPoints]);

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) {
      return;
    }

    const result = await submit();
    if (result) {
      setIsResultOpen(true);
    }
  };

  return (
    <>
      <section className="bg-[#f4f6f8] pb-40">
        {isAppEntry ? (
          <div className="border-b border-[#cfe0ff] bg-[#eef4ff]">
            <div className="mx-auto flex max-w-[1120px] items-start justify-between gap-4 px-4 py-3 text-[13px] sm:px-6">
              <div>
                <div className="font-bold text-[#175cd3]">WebView 진입 시나리오</div>
                <p className="mt-1 text-[#475467]">
                  앱 브리지 연결 전 단계까지 고려한 결제 화면입니다. 재진입과 중복 제출을 감안해
                  서버 견적과 requestId 기반 제출 흐름을 사용합니다.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#175cd3]">
                APP ENTRY
              </span>
            </div>
          </div>
        ) : null}

        <div className="border-b border-black/5 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[24px] font-black tracking-[-0.03em] text-[#111827]">
                주문 / 결제
              </div>
              <p className="mt-1 text-[14px] text-[#667085]">
                실서비스형 체크아웃 흐름을 기준으로, 금액 계산과 제출 경계를 분리했습니다.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-bold text-[#98a2b3]">
              <span className="rounded-[8px] bg-[#f2f4f7] px-3 py-1">장바구니</span>
              <span>&gt;</span>
              <span className="rounded-[8px] bg-[#111827] px-3 py-1 text-white">주문 / 결제</span>
              <span>&gt;</span>
              <span className="rounded-[8px] bg-[#f2f4f7] px-3 py-1">완료</span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1120px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <Section title="배송지">
              <div className="rounded-[16px] border border-[#e4e7ec] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                {address ? (
                  <>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-[20px] font-black text-[#111827]">
                          {address.recipient}
                        </div>
                        <div className="mt-2 text-[14px] text-[#475467]">{address.phone}</div>
                        <div className="mt-4 text-[15px] leading-7 text-[#111827]">
                          {`${address.roadAddress} ${address.detailAddress}`.trim()}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-[8px] border border-[#d0d5dd] px-3 py-2 text-[14px] font-semibold text-[#344054]"
                      >
                        주소 변경
                      </button>
                    </div>
                    <div className="mt-4 rounded-[10px] bg-[#f8fafc] px-4 py-4 text-[14px] text-[#475467]">
                      배송 메모: {address.deliveryMemo ?? "문 앞에 놓아 주세요."}
                    </div>
                  </>
                ) : (
                  <div className="rounded-[10px] border border-dashed border-[#d0d5dd] bg-[#fcfcfd] px-4 py-8 text-center">
                    <div className="text-[16px] font-bold text-[#111827]">
                      선택된 배송지가 없습니다.
                    </div>
                    <p className="mt-2 text-[14px] text-[#667085]">
                      로그인 후 배송지를 고르면 결제 가능 상태로 바뀝니다.
                    </p>
                  </div>
                )}
              </div>
            </Section>

            <Section title="주문 상품">
              <div className="rounded-[16px] border border-[#e4e7ec] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                {selectedProducts.length ? (
                  <div className="space-y-4">
                    {selectedProducts.map((product) => (
                      <article
                        key={product.id}
                        className="rounded-[12px] border border-[#eaecf0] bg-white p-4"
                      >
                        <div className="flex items-center justify-between gap-3 text-[13px] font-semibold text-[#667085]">
                          <span>{product.storeName}</span>
                          <span className="rounded-full bg-[#f2f4f7] px-3 py-1">무료배송</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                          <div className="relative h-[112px] w-full overflow-hidden rounded-[12px] bg-[#f2f4f7] sm:h-[92px] sm:w-[92px] sm:shrink-0">
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
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#03c75a] px-2.5 py-1 text-[11px] font-bold text-white">
                                <NaverPayIcon />
                                plus
                              </span>
                              <h3 className="text-[18px] font-bold tracking-[-0.03em] text-[#111827]">
                                {product.productName}
                              </h3>
                            </div>
                            <div className="mt-4 rounded-[10px] bg-[#f8fafc] px-4 py-3">
                              {product.options.map((option) => (
                                <div
                                  key={option.id}
                                  className="flex flex-col gap-1 py-2 text-[14px] text-[#475467] sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <span>
                                    옵션 {option.name} / {option.count}개
                                  </span>
                                  <div className="sm:text-right">
                                    <span className="mr-2 text-[#98a2b3] line-through">
                                      {formatPrice(option.unitOriginalPrice * option.count)}
                                    </span>
                                    <span className="font-bold text-[#111827]">
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
                ) : (
                  <div className="rounded-[10px] border border-dashed border-[#d0d5dd] bg-[#fcfcfd] px-4 py-8 text-center text-[14px] text-[#667085]">
                    장바구니에서 결제할 상품을 먼저 선택해 주세요.
                  </div>
                )}
              </div>
            </Section>

            <Section
              title="할인 / 포인트"
              rightValue={formatPrice(quote?.summary.totalAmount ?? 0)}
            >
              <div className="rounded-[16px] border border-[#e4e7ec] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="grid gap-3 sm:grid-cols-2">
                  <SummaryCard
                    label="쿠폰 할인"
                    value={formatPrice(quote?.summary.couponDiscount ?? 0)}
                  />
                  <SummaryCard
                    label="사용 포인트"
                    value={formatPrice(quote?.summary.usedPoints ?? 0)}
                    action={
                      <button
                        type="button"
                        className="rounded-[8px] border border-[#b7e4c7] bg-[#f3fbf5] px-3 py-2 text-[13px] font-bold text-[#067647]"
                        onClick={() => setUseAllPoints((prev) => !prev)}
                      >
                        {useAllPoints ? "포인트 해제" : "포인트 전액 사용"}
                      </button>
                    }
                  />
                </div>

                <label className="mt-4 flex items-center gap-2 text-[14px] text-[#475467]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-naver"
                    checked={useAllPoints}
                    onChange={(event) => setUseAllPoints(event.target.checked)}
                  />
                  보유 포인트를 최대한 적용합니다.
                </label>

                <div
                  aria-live="polite"
                  className="sr-only"
                >
                  {flowStatus === "quoting"
                    ? "주문 금액을 계산하고 있습니다."
                    : flowStatus === "ready"
                      ? "주문 금액 계산이 완료되었습니다."
                      : flowStatus === "submitting"
                        ? "결제 요청을 제출하고 있습니다."
                        : flowStatus === "success"
                          ? "결제 요청이 완료되었습니다."
                          : ""}
                </div>

                {quoteError ? (
                  <div className="mt-4 rounded-[12px] border border-[#fecdca] bg-[#fff6ed] p-4 text-[14px] text-[#b42318]">
                    <div className="font-bold">주문 금액을 불러오지 못했습니다.</div>
                    <p className="mt-1">{quoteError}</p>
                    <button
                      type="button"
                      className="mt-3 rounded-[8px] border border-[#fda29b] bg-white px-3 py-2 font-semibold text-[#b42318]"
                      onClick={() => {
                        void reloadQuote();
                      }}
                    >
                      다시 계산하기
                    </button>
                  </div>
                ) : null}

                {quote?.warnings.length ? (
                  <div className="mt-4 rounded-[12px] border border-[#fedf89] bg-[#fffaeb] p-4 text-[14px] text-[#b54708]">
                    <div className="font-bold">결제 전에 확인해 주세요.</div>
                    <ul className="mt-2 space-y-1">
                      {quote.warnings.map((warning) => (
                        <li key={warning}>- {warning}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-4 rounded-[12px] bg-[#f8fafc] px-4 py-4 text-[14px] text-[#475467]">
                  <div className="flex items-center justify-between">
                    <span>서버 금액 검증 시각</span>
                    <span>
                      {quote ? new Date(quote.serverValidatedAt).toLocaleTimeString("ko-KR") : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="결제 수단">
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const checked = selectedPaymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      className={`w-full rounded-[16px] border bg-white p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition ${
                        checked ? "border-[#03c75a] bg-[#fbfefc]" : "border-[#e4e7ec]"
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon
                          checked={checked}
                          className="mt-1 h-5 w-5 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-[17px] font-bold text-[#111827]">
                              {method.title}
                            </div>
                            {method.badge ? (
                              <span className="rounded-full border border-[#cfead8] bg-[#f5fbf7] px-2 py-1 text-[11px] font-bold text-[#03c75a]">
                                {method.badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-[14px] text-[#667085]">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[16px] border border-[#e4e7ec] bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
              <h2 className="text-[18px] font-black text-[#111827]">결제 요약</h2>
              <div className="mt-4 space-y-3 text-[14px] text-[#475467]">
                <Row
                  label="상품 원가"
                  value={formatPrice(quote?.summary.productOriginalAmount ?? 0)}
                />
                <Row
                  label="상품 판매가"
                  value={formatPrice(quote?.summary.productSaleAmount ?? 0)}
                />
                <Row
                  label="쿠폰 할인"
                  value={`-${formatPrice(quote?.summary.couponDiscount ?? 0)}`}
                />
                <Row
                  label="포인트 사용"
                  value={`-${formatPrice(quote?.summary.usedPoints ?? 0)}`}
                />
                <Row
                  label="배송비"
                  value={formatPrice(quote?.summary.shippingFee ?? 0)}
                />
              </div>
              <div className="mt-4 border-t border-[#eaecf0] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-[#111827]">최종 결제 금액</span>
                  <span className="text-[24px] font-black text-[#03c75a]">
                    {formatPrice(quote?.summary.totalAmount ?? 0)}
                  </span>
                </div>
                <div className="mt-2 text-[13px] text-[#667085]">
                  적립 예상 {formatPrice((quote?.summary.maxBenefit ?? 0) + 2700)}
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#e4e7ec] bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <label className="flex items-start gap-3 text-[14px] text-[#475467]">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-naver"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                />
                <span>주문 내용을 확인했고, 결제에 필요한 정보 제공 및 처리에 동의합니다.</span>
              </label>

              <button
                type="button"
                className={`mt-4 h-[56px] w-full rounded-[10px] text-[17px] font-black transition ${
                  canSubmit && !isSubmitting
                    ? "bg-[#03c75a] text-white"
                    : "cursor-not-allowed bg-[#cdd5df] text-white"
                }`}
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                {isLoadingQuote
                  ? "금액 계산 중..."
                  : isSubmitting
                    ? "결제 요청 중..."
                    : `${formatPrice(quote?.summary.totalAmount ?? 0)} 결제하기`}
              </button>

              {isAppEntry ? (
                <div className="mt-2 text-[12px] text-[#98a2b3]">
                  앱 재진입 시 결제수단과 동의 상태를 세션에 임시 저장합니다.
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {submitError ? (
        <div className="fixed inset-x-0 bottom-4 z-30 mx-auto max-w-[1120px] px-4 sm:px-6">
          <div className="rounded-[12px] border border-[#fecdca] bg-[#fff6ed] px-4 py-3 text-[14px] text-[#b42318] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
            <div className="font-bold">결제 요청에 실패했습니다.</div>
            <div className="mt-1">{submitError}</div>
          </div>
        </div>
      ) : null}

      <AlertModal
        open={isResultOpen}
        title={
          submitResult
            ? `주문이 접수되었습니다. (${submitResult.orderId})`
            : "결제가 완료되었습니다."
        }
        description={
          submitResult
            ? `${formatPrice(submitResult.totalAmount)} 결제 요청이 승인 직전 단계까지 처리되었습니다. ${submitResult.message}`
            : "결제 결과를 확인해 주세요."
        }
        confirmLabel="확인"
        onClose={() => setIsResultOpen(false)}
      />
    </>
  );
}

function Section({
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
        <h2 className="text-[18px] font-black text-[#111827]">{title}</h2>
        {rightValue ? (
          <span className="text-[15px] font-bold text-[#03c75a]">{rightValue}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SummaryCard({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[#eaecf0] bg-[#fcfcfd] p-4">
      <div className="text-[13px] font-semibold text-[#667085]">{label}</div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="text-[22px] font-black text-[#111827]">{value}</div>
        {action}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <span className="font-semibold text-[#111827]">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: CheckoutFlowStatus }) {
  const style =
    status === "ready"
      ? "bg-[#ecfdf3] text-[#067647]"
      : status === "quoting" || status === "submitting"
        ? "bg-[#eff8ff] text-[#175cd3]"
        : status === "success"
          ? "bg-[#ecfdf3] text-[#027a48]"
          : status === "quote-error" || status === "submit-error"
            ? "bg-[#fff6ed] text-[#b42318]"
            : "bg-[#f2f4f7] text-[#475467]";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${style}`}
    >
      {status}
    </span>
  );
}

function getStatusMessage(status: CheckoutFlowStatus) {
  if (status === "quoting") return "서버에서 주문 금액을 다시 계산 중입니다.";
  if (status === "ready") return "결제 가능한 상태입니다.";
  if (status === "submitting") return "결제 요청을 제출하고 있습니다.";
  if (status === "success") return "결제 요청이 승인 직전 단계까지 완료되었습니다.";
  if (status === "submit-error") return "결제 요청 실패 후 재시도 가능한 상태입니다.";
  if (status === "quote-error") return "금액 계산 실패로 재검증이 필요합니다.";
  return "체크아웃을 준비 중입니다.";
}
