import Image from "next/image";
import PromoBadge from "./PromoBadge";
import type { PromoItem } from "./types";

export default function PromoCard({ item }: { item: PromoItem }) {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href ? { href: item.href } : {};
  const isPriority = Number(item.id) <= 2;

  return (
    <Wrapper {...(wrapperProps as object)} className="group block">
      <div className="relative rounded-md bg-gray-50">
        {item.badge ? (
          <PromoBadge type={item.badge.type} label={item.badge.label} />
        ) : null}

        <div className="relative aspect-square w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 180px"
            className="rounded-md object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            priority={isPriority}
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
