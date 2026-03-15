type BadgeCountProps = {
  count: number;
  max?: number;
  className?: string;
  ariaLabel?: string;
};

export default function BadgeCount({
  count,
  max = 99,
  className = "",
  ariaLabel,
}: BadgeCountProps) {
  if (count <= 0) return null;

  const text = count > max ? `${max}+` : String(count);

  return (
    <span
      className={[
        "bg-red-500 text-white",
        "text-[10px] font-bold leading-none",
        "flex items-center justify-center",
        "min-w-[16px] h-[16px] px-[4px] rounded-full",
        "border-2 border-white",
        className,
      ].join(" ")}
      aria-label={ariaLabel ?? `알림 ${text}개`}
    >
      {text}
    </span>
  );
}