type CheckCircleIconProps = {
  checked?: boolean;
  className?: string;
};

export default function CheckCircleIcon({ checked = false, className }: CheckCircleIconProps) {
  if (checked) {
    // 체크된 상태 (녹색)
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="10"
          fill="#09aa5c"
        />
        <path
          d="M14.8 6.8L8.7 12.9L5.4 9.6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 체크 안된 상태 (회색)
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="white"
        stroke="#BDBDBD"
        strokeWidth="2"
      />
      <path
        d="M14.8 6.8L8.7 12.9L5.4 9.6"
        stroke="#BDBDBD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
