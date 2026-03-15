// src/domains/home/components/TodayEventSection/PromoCard.tsx
import Image from "next/image";
import PromoBadge from "./PromoBadge";
import type { PromoItem } from "./types";

export default function PromoCard({ item }: { item: PromoItem }) {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href ? { href: item.href } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={[].join(" ")}
    >
      <div className="relative rounded-md bg-gray-50">
        {item.badge ? (
          <PromoBadge
            type={item.badge.type}
            label={item.badge.label}
          />
        ) : null}

        {/* 이미지 영역: 스크린샷처럼 정사각형 카드 느낌 */}
        <div className="relative aspect-square w-full">
          <Image
            src={item.imageUrl}
            alt={""}
            fill
            className="object-contain transition-transform duration-200 group-hover:scale-[1.02] rounded-md"
            priority={false}
          />
        </div>
      </div>

      <div className="mt-2 text-[13px] leading-5 text-gray-900">
        {item.discountText ? (
          <span className="mr-1 font-semibold text-violet-600">{item.discountText}</span>
        ) : null}
        <span className="line-clamp-2">{item.title}</span>
      </div>
    </Wrapper>
  );
}
