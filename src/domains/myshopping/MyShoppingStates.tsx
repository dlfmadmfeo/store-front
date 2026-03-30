"use client";

export function MyShoppingErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-[16px] border border-red-100 bg-white px-6 py-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <p className="text-[15px] text-gray-600">{message}</p>
      {onRetry ? (
        <button
          type="button"
          className="mt-4 rounded-[10px] bg-[#111827] px-4 py-2 text-[14px] font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09aa5c] focus-visible:ring-offset-2"
          onClick={onRetry}
        >
          다시 시도
        </button>
      ) : null}
    </div>
  );
}

export function MyShoppingEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[16px] bg-white px-6 py-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <h2 className="text-[18px] font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-[15px] text-gray-500">{description}</p>
    </div>
  );
}

export function MyShoppingCardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div
      aria-hidden="true"
      className="rounded-[16px] bg-white px-6 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
    >
      <div className="h-5 w-32 animate-pulse rounded bg-gray-100" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-4 animate-pulse rounded bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}
