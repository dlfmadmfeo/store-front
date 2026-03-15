type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function MessageIcon({ size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M11 3.5C6.86 3.5 3.5 6.37 3.5 9.9C3.5 11.56 4.24 13.08 5.46 14.22L5.1 17.2L8.1 15.7C9 16.02 9.97 16.2 11 16.2C15.14 16.2 18.5 13.33 18.5 9.8C18.5 6.37 15.14 3.5 11 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="8.2"
        cy="9.8"
        r="0.9"
        fill="currentColor"
      />
      <circle
        cx="11"
        cy="9.8"
        r="0.9"
        fill="currentColor"
      />
      <circle
        cx="13.8"
        cy="9.8"
        r="0.9"
        fill="red"
      />
    </svg>
  );
}
