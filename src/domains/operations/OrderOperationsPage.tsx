"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOperationOrders, updateOperationOrder } from "@/lib/api/operations";
import type { MyShoppingOrder, OrderStatus } from "@/domains/myshopping/types";
import { InlineErrorState, InlineEmptyState, SectionSkeleton } from "@/components/common/SectionSkeleton";
import { buildMyShoppingOrderLink, getOrderFilterFromStatus } from "@/lib/utils/myShoppingDeepLink";

const statusOptions: Array<{ label: string; value: string }> = [
  { label: "전체", value: "all" },
  { label: "배송준비중", value: "배송준비중" },
  { label: "배송중", value: "배송중" },
  { label: "구매확정완료", value: "구매확정완료" },
  { label: "교환접수", value: "교환접수" },
  { label: "환불처리중", value: "환불처리중" },
];

const channelOptions = [
  { label: "전체 채널", value: "all" },
  { label: "웹", value: "web" },
  { label: "앱", value: "app" },
];

export default function OrderOperationsPage() {
  const router = useRouter();
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [channel, setChannel] = useState("all");
  const [orders, setOrders] = useState<MyShoppingOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState<OrderStatus>("배송준비중");
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const items = await fetchOperationOrders({ query, status, channel });
        if (!mounted) return;

        setOrders(items);
        const fallbackOrder = items[0] ?? null;
        const nextSelected = items.find((item) => item.id === selectedOrderId) ?? fallbackOrder;

        setSelectedOrderId(nextSelected?.id ?? null);
        setEditingStatus(nextSelected?.status ?? "배송준비중");
        setMemo(nextSelected?.managementMemo ?? "");
      } catch {
        if (mounted) {
          setError("운영 주문 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [query, status, channel]);

  const selectedOrder = orders.find((item) => item.id === selectedOrderId) ?? null;

  const handleSave = async () => {
    if (!selectedOrder) return;

    try {
      setIsSaving(true);
      const updated = await updateOperationOrder({
        orderId: selectedOrder.id,
        status: editingStatus,
        managementMemo: memo,
      });

      setOrders((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      setFeedback("주문 상태와 메모를 반영함.");
    } catch {
      setFeedback("저장에 실패함.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="bg-[#f4f7fb] px-3 py-6 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[1280px] space-y-5">
        <section
          aria-labelledby="operations-orders-heading"
          className="rounded-[18px] bg-white px-5 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-7"
        >
          <p className="text-[13px] font-medium text-[#5f6672]">운영 도구</p>
          <h1
            id="operations-orders-heading"
            className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-[#111827] sm:text-[32px]"
          >
            주문 운영 관리
          </h1>
          <p className="mt-3 text-[15px] text-[#6b7280]">
            주문 검색, 상태 필터링, 운영 메모 업데이트를 한 화면에서 처리하는 내부 관리 화면 시안입니다.
          </p>
        </section>

        <section
          aria-label="주문 운영 검색과 필터"
          className="rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-5"
        >
          <form
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px_100px]"
            onSubmit={(event) => {
              event.preventDefault();
              setQuery(queryInput);
            }}
          >
            <label className="sr-only" htmlFor="operations-order-query">
              주문 검색어
            </label>
            <input
              id="operations-order-query"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="주문번호, 고객명, 상품명 검색"
              className="rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] outline-none"
            />

            <label className="sr-only" htmlFor="operations-order-status">
              주문 상태 필터
            </label>
            <select
              id="operations-order-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="operations-order-channel">
              유입 채널 필터
            </label>
            <select
              id="operations-order-channel"
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              className="rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] outline-none"
            >
              {channelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-[12px] bg-[#111827] px-4 py-3 text-[14px] font-semibold text-white"
            >
              조회
            </button>
          </form>
        </section>

        {error ? (
          <InlineErrorState title="운영 주문 목록을 불러오지 못했습니다" description={error} />
        ) : isLoading ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <SectionSkeleton lines={8} titleWidth="w-32" />
            <SectionSkeleton lines={6} titleWidth="w-24" />
          </div>
        ) : orders.length === 0 ? (
          <InlineEmptyState
            title="조건에 맞는 주문이 없습니다"
            description="검색어 또는 필터를 바꿔서 다시 조회해 주세요."
          />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section
              aria-labelledby="operations-order-list-heading"
              className="rounded-[18px] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
            >
              <h2
                id="operations-order-list-heading"
                className="border-b border-gray-100 px-5 py-4 text-[16px] font-bold text-[#111827]"
              >
                주문 목록 {orders.length}건
              </h2>

              <div className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const isActive = selectedOrderId === order.id;

                  return (
                    <button
                      key={order.id}
                      type="button"
                      aria-pressed={isActive}
                      className={[
                        "w-full px-5 py-4 text-left transition-colors",
                        isActive ? "bg-[#f8fafc]" : "bg-white hover:bg-[#fbfcfd]",
                      ].join(" ")}
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setEditingStatus(order.status);
                        setMemo(order.managementMemo);
                        setFeedback("");
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-[14px] font-semibold text-[#111827]">{order.orderNumber}</div>
                        <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[12px] font-medium text-[#4338ca]">
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2 text-[14px] text-[#374151]">{order.title}</div>
                      <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-[#6b7280]">
                        <span>{order.customerName}</span>
                        <span>{order.channel === "app" ? "앱 웹뷰" : "웹"}</span>
                        <span>{order.paymentMethod}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <aside
              aria-labelledby="operations-order-detail-heading"
              className="rounded-[18px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
            >
              {selectedOrder ? (
                <>
                  <h2 id="operations-order-detail-heading" className="text-[18px] font-bold text-[#111827]">
                    주문 상세 운영
                  </h2>
                  <div className="mt-4 space-y-3 text-[14px] text-[#374151]">
                    <div>
                      <div className="text-[12px] text-[#6b7280]">주문번호</div>
                      <div className="mt-1 font-semibold">{selectedOrder.orderNumber}</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-[#6b7280]">고객명</div>
                      <div className="mt-1">{selectedOrder.customerName}</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-[#6b7280]">배송지</div>
                      <div className="mt-1">{selectedOrder.shippingAddress}</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-[#6b7280]">결제수단</div>
                      <div className="mt-1">{selectedOrder.paymentMethod}</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-[#6b7280]">진입채널</div>
                      <div className="mt-1">{selectedOrder.channel === "app" ? "앱 웹뷰" : "웹"}</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="operations-order-edit-status" className="text-[12px] text-[#6b7280]">
                      운영 상태 변경
                    </label>
                    <select
                      id="operations-order-edit-status"
                      value={editingStatus}
                      onChange={(event) => setEditingStatus(event.target.value as OrderStatus)}
                      className="mt-2 w-full rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] outline-none"
                    >
                      {statusOptions.filter((option) => option.value !== "all").map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="operations-order-memo" className="text-[12px] text-[#6b7280]">
                      운영 메모
                    </label>
                    <textarea
                      id="operations-order-memo"
                      value={memo}
                      onChange={(event) => setMemo(event.target.value)}
                      className="mt-2 min-h-[140px] w-full rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] outline-none"
                    />
                  </div>

                  <p aria-live="polite" className="mt-3 min-h-[20px] text-[13px] text-[#16a34a]">
                    {feedback}
                  </p>

                  <div className="mt-4 rounded-[12px] border border-[#d8e5ff] bg-[#f7faff] px-4 py-4">
                    <div className="text-[13px] font-semibold text-[#1d4ed8]">앱 웹뷰 진입 테스트</div>
                    <p className="mt-2 text-[13px] leading-5 text-[#4b5563]">
                      운영 화면에서 선택한 주문을 앱 웹뷰로 열 때 쓰는 딥링크를 여기서 바로 재현할 수 있습니다.
                    </p>
                    <button
                      type="button"
                      className="mt-3 w-full rounded-[12px] border border-[#bfdbfe] bg-white px-4 py-3 text-[14px] font-semibold text-[#1d4ed8]"
                      onClick={() => {
                        router.push(
                          buildMyShoppingOrderLink({
                            entry: "app",
                            filter: getOrderFilterFromStatus(selectedOrder.status),
                            orderId: selectedOrder.id,
                            source: "operations",
                          }),
                        );
                      }}
                    >
                      앱 웹뷰 주문 화면으로 열기
                    </button>
                  </div>

                  <button
                    type="button"
                    className="mt-4 w-full rounded-[12px] bg-[#111827] px-4 py-3 text-[14px] font-semibold text-white"
                    onClick={() => {
                      void handleSave();
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? "저장 중..." : "운영 상태 저장"}
                  </button>
                </>
              ) : (
                <InlineEmptyState
                  title="선택된 주문이 없습니다"
                  description="왼쪽 목록에서 주문을 선택해 주세요."
                />
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
