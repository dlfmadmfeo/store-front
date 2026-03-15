type EyeOffIconProps = {
  size?: number;
  className?: string;
  useSlash: boolean;
};

export default function EyeOffIcon({ size = 18, className, useSlash = true }: EyeOffIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* eye */}
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.73-1.74 1.79-3.41 3.06-4.94" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8a11.75 11.75 0 0 1-2.16 3.19" />

      {/* pupil */}
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />

      {/* slash */}
      {useSlash ? (
        <line
          x1="1"
          y1="1"
          x2="23"
          y2="23"
        />
      ) : null}
    </svg>
  );
}
