import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  filled?: boolean;
};

export default function HeaderEmailIcon({ size = 24, filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M4 6.5H20V17.5H4V6.5ZM5.7 7.8L12 12.2L18.3 7.8V7.5H5.7V7.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="4"
        y="6.5"
        width="16"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 8L12 12.5L19 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
