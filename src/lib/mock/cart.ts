import type { CartProduct } from "@/lib/types/cart";

export const mockCartProducts: CartProduct[] = [
  {
    id: 1,
    storeName: "HIGHWAYMART",
    productName:
      "\uD55C\uC6B0 \uD504\uB9AC\uBBF8\uC5C4 \uC219\uC131 \uC18C\uACE0\uAE30 \uBAA8\uB4EC \uAD6C\uC774 \uC138\uD2B8 500g",
    originalPrice: 14900,
    salePrice: 10900,
    checked: true,
    shippingText: "\uB0B4\uC77C\uCD9C\uBC1C \uC608\uC815",
    options: [
      {
        id: 1,
        name: "\uAD6C\uC774\uC6A9 500g (-2,000\uC6D0)",
        unitOriginalPrice: 12000,
        unitSalePrice: 9900,
        count: 2,
      },
      {
        id: 2,
        name: "\uC120\uBB3C \uD3EC\uC7A5 \uCD94\uAC00",
        unitOriginalPrice: 4000,
        unitSalePrice: 4000,
        count: 1,
      },
    ],
  },
  {
    id: 2,
    storeName: "HIGHWAYMART",
    productName: "\uD504\uB9AC\uBBF8\uC5C4 \uC18C\uACE0\uAE30 \uAD6C\uC774\uC6A9 500g",
    originalPrice: 17900,
    salePrice: 13900,
    checked: true,
    shippingText: "\uC624\uB298 15:00 \uC774\uC804 \uACB0\uC81C \uC2DC \uB2F9\uC77C \uBC1C\uC1A1",
    options: [
      {
        id: 1,
        name: "\uAE30\uBCF8 \uC635\uC158",
        unitOriginalPrice: 9900,
        unitSalePrice: 4900,
        count: 1,
      },
    ],
  },
];
