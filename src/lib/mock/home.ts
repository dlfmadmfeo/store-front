import type { PromoItem } from "@/lib/types/home";

export const mockTodayEvents: PromoItem[] = [
  {
    id: "1",
    title: "MLB \uBD04 \uC2E0\uC0C1 \uD2B9\uAC00 \uB9E4\uC8FC",
    imageUrl: "/images/shortcut_1.gif",
    badge: { type: "BRAND_DAY", label: "BRAND DAY" },
  },
  {
    id: "2",
    title: "\uC624\uB298 \uD55C\uC815 \uAC00\uC804 \uBB34\uB8CC \uBC30\uC1A1",
    imageUrl: "/images/next.svg",
  },
  {
    id: "3",
    title: "\uB77C\uC774\uD504\uC2A4\uD0C0\uC77C \uAE30\uD68D\uC804 \uCD5C\uB300 5\uB9CC\uC6D0 \uCFE0\uD3F0",
    imageUrl: "/images/vercel.svg",
    badge: { type: "SEASON_OFF", label: "SEASON OFF" },
  },
  {
    id: "4",
    title: "\uC2DC\uC98C \uB9C8\uAC10 \uD2B9\uAC00 \uCD5C\uB300 67%",
    imageUrl: "/images/window.svg",
    discountText: "~67%",
  },
  {
    id: "5",
    title: "\uD31D\uC5C5 \uC2A4\uD1A0\uC5B4 \uC624\uD508 \uAE30\uB150 \uD61C\uD0DD",
    imageUrl: "/images/shortcut_1.gif",
    badge: { type: "TODAY_PICK", label: "TODAY PICK" },
  },
  {
    id: "6",
    title: "\uC0DD\uD65C\uC6A9\uD488 \uBB36\uC74C \uAE30\uD68D\uC804",
    imageUrl: "/images/next.svg",
    discountText: "~35%",
  },
];
