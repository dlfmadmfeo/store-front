type Props = {
  className?: string;
  size: number;
};

export default function UserIcon({ className, size }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      width={size}
      height={size}
    >
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4.5 19.5c1.7-3 4.3-4.5 7.5-4.5s5.8 1.5 7.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
