type Props = {
  className?: string;
};

export default function GlobeIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.8 12h16.4M12 3.8c2.3 2.2 3.5 5.1 3.5 8.2S14.3 18 12 20.2M12 3.8C9.7 6 8.5 8.9 8.5 12s1.2 6 3.5 8.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
