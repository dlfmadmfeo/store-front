"use client";

import type { ReactNode } from "react";

export function SectionSkeleton({
  lines = 3,
  titleWidth = "w-32",
}: {
  lines?: number;
  titleWidth?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="rounded-[16px] bg-white px-6 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
    >
      <div className={`h-5 animate-pulse rounded bg-gray-100 ${titleWidth}`} />
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

export function InlineErrorState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-red-100 bg-white px-6 py-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <h2 className="text-[18px] font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-[15px] text-gray-500">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function InlineEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[16px] bg-white px-6 py-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <h2 className="text-[18px] font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-[15px] text-gray-500">{description}</p>
    </div>
  );
}
