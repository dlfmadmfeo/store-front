type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function ProfileIcon({ size = 26, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="13"
        cy="13"
        r="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="13"
        cy="10"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.8 19.2C8.9 16.8 10.8 15.7 13 15.7C15.2 15.7 17.1 16.8 18.2 19.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
