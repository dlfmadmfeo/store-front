type Props = {
  className?: string;
};

export default function IdCardIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="8.5"
        cy="11"
        r="1.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.5 15c.6-1.2 1.5-1.8 2.7-1.8s2.1.6 2.7 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 10h4M13.5 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
