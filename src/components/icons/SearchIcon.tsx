export default function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className="text-violet-500 cursor-pointer"
      onClick={() => {
        alert("click");
      }}
    >
      <circle
        cx="10.412"
        cy="10.412"
        r="7.412"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      ></circle>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M15.706 15.706L21 21"
      ></path>
    </svg>
  );
}
