export default function MyShoppingIcon({ active = false }: { active: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      fill="none"
      className="_gnbContent_icon_ESr3R person"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        d="M13.915 13.144a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm-7.88 9.391a1.379 1.379 0 01-1.379-1.378v0c0-.763.36-1.482.968-1.94a13.354 13.354 0 0116.066 0c.608.459.966 1.176.966 1.938v0a1.38 1.38 0 01-1.38 1.38H6.035z"
        fill={active ? "black" : "none"}
      ></path>
    </svg>
  );
}
