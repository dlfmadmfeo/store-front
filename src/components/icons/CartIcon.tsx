export default function CartIcon({
  active = false,
  size = 28,
}: {
  active?: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className="_gnbContent_icon_ESr3R _gnbContent_cart_jaybJ"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
        d="M17.75 12.75V8A3.75 3.75 0 0014 4.25v0A3.75 3.75 0 0010.25 8v4.75"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        d="M22.442 10.25H5.558a.836.836 0 00-.813 1.03l2.113 8.897a3.346 3.346 0 003.255 2.573h7.774a3.346 3.346 0 003.255-2.573l2.113-8.897a.836.836 0 00-.813-1.03z"
        fill={active ? "black" : "none"}
      />
    </svg>
  );
}
