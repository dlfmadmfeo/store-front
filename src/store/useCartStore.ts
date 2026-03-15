import { create } from "zustand";

export interface CartOption {
  id: number;
  name: string;
  unitOriginalPrice: number;
  unitSalePrice: number;
  count: number;
}

export interface CartProduct {
  id: number;
  storeName: string;
  productName: string;
  originalPrice: number;
  salePrice: number;
  imageUrl?: string;
  shippingText?: string;
  options: CartOption[];
  checked: boolean;
}

interface CartState {
  products: CartProduct[];

  increase: (productId: number, optionId: number) => void;
  decrease: (productId: number, optionId: number) => void;
  removeOption: (productId: number, optionId: number) => void;
  toggleProduct: (productId: number) => void;

  getProductTotalPrice: (productId: number) => number;
  getProductDiscountRate: (productId: number) => number;
  totalPrice: () => number;

  toggleAll: (checked: boolean) => void;
  removeSelected: () => void;
  allSelected: () => boolean;
  selectedCount: () => number;

  totalOriginalPrice: () => number;
  totalSalePrice: () => number;
  totalDiscount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  products: [
    {
      id: 1,
      storeName: "HIGHWAYMART",
      productName:
        "녹차먹인돼지 프리미엄 냉장 한돈 돼지고기 수육용 구이용 삼겹살 목살 등갈비 앞다리 가브리살 500g",
      originalPrice: 14900,
      salePrice: 10900,
      checked: true,
      shippingText: "오늘출발 휴무일 3.10.(화) 발송 예정",
      options: [
        {
          id: 1,
          name: "안심 500g (-2,000원)",
          unitOriginalPrice: 12000,
          unitSalePrice: 9900,
          count: 2,
        },
        {
          id: 2,
          name: "추가상품 : ★명품선물용포장(보냉지함)",
          unitOriginalPrice: 4000,
          unitSalePrice: 4000,
          count: 1,
        },
      ],
    },
    {
      id: 2,
      storeName: "HIGHWAYMART",
      productName: "프리미엄 한돈 목살 구이용 500g",
      originalPrice: 17900,
      salePrice: 13900,
      checked: true,
      shippingText: "오늘출발 15:00 이전 결제 시 당일 발송",
      options: [
        {
          id: 1,
          name: "기본 옵션",
          unitOriginalPrice: 9900,
          unitSalePrice: 4900,
          count: 1,
        },
      ],
    },
  ],
  // products: [],
  increase: (productId, optionId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              options: product.options.map((option) =>
                option.id === optionId ? { ...option, count: option.count + 1 } : option
              ),
            }
          : product
      ),
    })),

  decrease: (productId, optionId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              options: product.options.map((option) =>
                option.id === optionId && option.count > 1
                  ? { ...option, count: option.count - 1 }
                  : option
              ),
            }
          : product
      ),
    })),

  removeOption: (productId, optionId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              options: product.options.filter((option) => option.id !== optionId),
            }
          : product
      ),
    })),

  toggleProduct: (productId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, checked: !product.checked } : product
      ),
    })),

  getProductTotalPrice: (productId) => {
    const product = get().products.find((item) => item.id === productId);
    if (!product) {
      return 0;
    }

    return product.options.reduce((sum, option) => {
      return sum + option.unitSalePrice * option.count;
    }, 0);
  },

  getProductDiscountRate: (productId) => {
    const product = get().products.find((item) => item.id === productId);
    if (!product || product.originalPrice <= 0) {
      return 0;
    }

    return Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
  },

  totalPrice: () => {
    return get()
      .products.filter((product) => product.checked)
      .reduce((productSum, product) => {
        const optionTotal = product.options.reduce((optionSum, option) => {
          return optionSum + option.unitSalePrice * option.count;
        }, 0);

        return productSum + optionTotal;
      }, 0);
  },

  toggleAll: (checked) =>
    set((state) => ({
      products: state.products.map((product) => ({
        ...product,
        checked,
      })),
    })),

  removeSelected: () =>
    set((state) => ({
      products: state.products.filter((product) => !product.checked),
    })),

  allSelected: () => {
    const products = get().products;
    return products.length > 0 && products.every((product) => product.checked);
  },

  selectedCount: () => {
    return get().products.filter((product) => product.checked).length;
  },

  totalOriginalPrice: () => {
    return get()
      .products.filter((p) => p.checked)
      .reduce((sum, product) => {
        const optionTotal = product.options.reduce((optionSum, option) => {
          return optionSum + option.unitOriginalPrice * option.count;
        }, 0);

        return sum + optionTotal;
      }, 0);
  },

  totalSalePrice: () => {
    return get()
      .products.filter((p) => p.checked)
      .reduce((sum, product) => {
        const optionTotal = product.options.reduce((optionSum, option) => {
          return optionSum + option.unitSalePrice * option.count;
        }, 0);

        return sum + optionTotal;
      }, 0);
  },

  totalDiscount: () => {
    return get().totalOriginalPrice() - get().totalSalePrice();
  },
}));
