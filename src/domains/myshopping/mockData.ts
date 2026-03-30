import type {
  MyShoppingHomeData,
  MyShoppingMenuSection,
  MyShoppingOrder,
} from "./types";

export const myShoppingMenuSections: MyShoppingMenuSection[] = [
  {
    title: "\uB9C8\uC774\uC1FC\uD551 \uD648",
    path: "/myshop",
    items: [],
  },
  {
    title: "\uC8FC\uBB38/\uBC30\uC1A1\uB0B4\uC5ED",
    path: "/myshop/orders",
    items: [],
  },
  {
    title: "\uCC1C\uD55C \uC0C1\uD488",
    items: [],
  },
  {
    title: "\uCD5C\uADFC \uBCF8 \uC0C1\uD488",
    items: [],
  },
  {
    title: "\uB9AC\uBDF0 \uC791\uC131",
    items: [
      "\uC791\uC131 \uAC00\uB2A5\uD55C \uB9AC\uBDF0",
      "\uB0B4\uAC00 \uC791\uC131\uD55C \uB9AC\uBDF0",
    ],
  },
  {
    title: "\uAD00\uC2EC \uC2A4\uD1A0\uC5B4",
    items: [
      "\uC54C\uB9BC \uC2A4\uD1A0\uC5B4",
      "\uAC00\uC785 \uB77C\uC6B4\uC9C0",
    ],
  },
  {
    title: "\uC815\uAE30\uAD6C\uB3C5",
    items: [],
  },
  {
    title: "\uBB34\uB8CC\uCCB4\uD5D8",
    items: [],
  },
  {
    title: "\uC0C1\uD488 Q&A",
    items: [],
  },
];

export const myShoppingHomeData: MyShoppingHomeData = {
  profile: {
    userName: "\uC870\uC900\uD76C\uB2D8",
    profileLabel: "\uC1FC\uD551 \uD504\uB85C\uD544",
    rewardLabel: "N pay",
    rewardValue: "5,051P",
    benefitLabel: "\uCD5C\uB300 5% \uC801\uB9BD",
  },
  quickLinks: [
    { title: "\uC8FC\uBB38/\uBC30\uC1A1\uB0B4\uC5ED", icon: "OD", path: "/myshop/orders" },
    { title: "\uCC1C\uD55C\uC0C1\uD488", icon: "LK", path: "/myshop" },
    { title: "\uB9AC\uBDF0\uC791\uC131", icon: "RV", path: "/myshop" },
    { title: "\uAD00\uC2EC\uC2A4\uD1A0\uC5B4", icon: "ST", path: "/myshop" },
    { title: "\uBCF4\uC720\uCFE0\uD3F0", icon: "CP" },
    { title: "\uCD5C\uADFC\uBCF8\uC0C1\uD488", icon: "RC" },
    { title: "\uC0C1\uD488Q&A", icon: "QA" },
    { title: "\uC790\uC8FC\uAD6C\uB9E4", icon: "RB" },
    { title: "\uC815\uAE30\uAD6C\uB3C5", icon: "SB" },
    { title: "\uC120\uBB3C\uD568", icon: "GF" },
    { title: "\uB80C\uD0C8", icon: "RT" },
    { title: "\uBB34\uB8CC\uCCB4\uD5D8", icon: "FR" },
  ],
  likedProducts: [
    {
      id: "liked-1",
      brand: "atelier morn",
      title: "\uD3EC\uADFC\uD55C \uD638\uD154\uC2DD \uCE68\uAD6C \uC138\uD2B8",
      priceLabel: "89,000\uC6D0",
      accent: "from-[#f7e7d5] to-[#f0c59f]",
      badge: "\uBB34\uB8CC\uBC30\uC1A1",
    },
    {
      id: "liked-2",
      brand: "wood frame",
      title: "\uC6D0\uBAA9 \uC218\uB0A9\uD615 LED \uCE68\uB300 \uD504\uB808\uC784",
      priceLabel: "243,500\uC6D0",
      accent: "from-[#eadfce] to-[#c6a78a]",
      badge: "\uBCA0\uC2A4\uD2B8",
    },
    {
      id: "liked-3",
      brand: "wedding note",
      title: "\uC6E8\uB529 \uC804\uBB38 \uC0AC\uD68C\uC790 \uC12D\uC678 \uD328\uD0A4\uC9C0",
      priceLabel: "140,300\uC6D0",
      accent: "from-[#f6edd8] to-[#d8b36c]",
      badge: "\uCD94\uCC9C",
    },
    {
      id: "liked-4",
      brand: "studio live",
      title: "\uD504\uB9AC\uBBF8\uC5C4 \uCD95\uAC00 \uB77C\uC774\uBE0C \uC608\uC57D",
      priceLabel: "240,500\uC6D0",
      accent: "from-[#d8d2ca] to-[#82756d]",
      badge: "\uC778\uAE30",
    },
  ],
};

export const myShoppingOrders: MyShoppingOrder[] = [
  {
    id: "order-1",
    status: "\uAD6C\uB9E4\uD655\uC815\uC644\uB8CC",
    orderedAt: "2025.12.10. 11:28 \uC8FC\uBB38",
    title:
      "[\uC7A5\uC0AC\uC758\uC2E0 \uC591\uB150]\uD55C \uC6B0\uC9D1 \uD55C\uC6B0 \uAC08\uBE44\uD0D5 \uBCF4\uC591\uC2DD \uC655\uAC08\uBE44\uD0D5 \uBC00\uD0A4\uD2B8 \uC0AD\uB9C9\uC740 \uC18C\uAC08\uBE44\uD0D5 \uB9D1\uC740 \uAD6D\uBC25 600g",
    priceLabel: "10,000\uC6D0",
    sellerActionLabel: "\uD310\uB9E4\uC790\uC815\uBCF4/\uBB38\uC758 >",
    imageClass: "from-[#7c5236] via-[#a86a44] to-[#e6d4b9]",
  },
  {
    id: "order-2",
    status: "\uAD6C\uB9E4\uD655\uC815\uC644\uB8CC",
    orderedAt: "2025.5.12. 13:37 \uC8FC\uBB38",
    title:
      "\uBD80\uC0B0\uB79C\uB4DC\uB9C8\uD06C\uD328\uD0A4\uC9C0 \uD574\uBCC0\uC5F4\uCC28 \uB8E8\uC9C0 \uC544\uCFE0\uC544\uB9AC\uC6C0 \uAD11\uC548\uB9AC \uD22C\uC5B4\uD328\uC2A4 \uD14C\uB9C8\uD30C\uD06C \uAC00\uBCFC\uB9CC\uD55C\uACF3 \uC694\uD2B8",
    priceLabel: "38,900\uC6D0",
    sellerActionLabel: "\uD310\uB9E4\uC790\uC815\uBCF4/\uBB38\uC758 >",
    imageClass: "from-[#6c78cc] via-[#8b8fe3] to-[#d9defd]",
  },
];
