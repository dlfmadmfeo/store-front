type Props = {
  size?: number;
  className?: string;
};

export default function CloseCircleIcon({ size = 18, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* circle background */}
      <circle
        cx="9"
        cy="9"
        r="9"
        fill="#9CA3AF"
      />

      {/* X */}
      <path
        d="M6 6L12 12"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 6L6 12"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
