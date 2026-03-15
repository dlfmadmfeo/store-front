import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  filled?: boolean;
};

export default function NotificationBellIcon({ size = 24, filled = false, ...props }: IconProps) {
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
          d="M12 4.25C9.38 4.25 7.25 6.38 7.25 9V11.2C7.25 12.13 6.95 13.04 6.39 13.78L5.4 15.1C4.96 15.69 5.38 16.5 6.12 16.5H17.88C18.62 16.5 19.04 15.69 18.6 15.1L17.61 13.78C17.05 13.04 16.75 12.13 16.75 11.2V9C16.75 6.38 14.62 4.25 12 4.25Z"
          fill="currentColor"
        />
        <path
          d="M10 18C10.35 18.87 11.11 19.5 12 19.5C12.89 19.5 13.65 18.87 14 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
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
      <path
        d="M12 4.25C9.38 4.25 7.25 6.38 7.25 9V11.2C7.25 12.13 6.95 13.04 6.39 13.78L5.4 15.1C4.96 15.69 5.38 16.5 6.12 16.5H17.88C18.62 16.5 19.04 15.69 18.6 15.1L17.61 13.78C17.05 13.04 16.75 12.13 16.75 11.2V9C16.75 6.38 14.62 4.25 12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 18C10.35 18.87 11.11 19.5 12 19.5C12.89 19.5 13.65 18.87 14 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
