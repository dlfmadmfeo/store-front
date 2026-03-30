export default function ChevronRightIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 13l5-5-5-5"
      ></path>
    </svg>
  );
}
