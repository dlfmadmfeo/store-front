"use client";

import { create } from "zustand";
import type { CartProduct } from "@/lib/types/cart";

interface CartState {
  products: CartProduct[];
  setProducts: (products: CartProduct[]) => void;

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
  products: [],
  setProducts: (products) => set({ products }),

  increase: (productId, optionId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              options: product.options.map((option) =>
                option.id === optionId ? { ...option, count: option.count + 1 } : option,
              ),
            }
          : product,
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
                  : option,
              ),
            }
          : product,
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
          : product,
      ),
    })),

  toggleProduct: (productId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, checked: !product.checked } : product,
      ),
    })),

  getProductTotalPrice: (productId) => {
    const product = get().products.find((item) => item.id === productId);
    if (!product) {
      return 0;
    }

    return product.options.reduce((sum, option) => sum + option.unitSalePrice * option.count, 0);
  },

  getProductDiscountRate: (productId) => {
    const product = get().products.find((item) => item.id === productId);
    if (!product || product.originalPrice <= 0) {
      return 0;
    }

    return Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
  },

  totalPrice: () =>
    get()
      .products.filter((product) => product.checked)
      .reduce((productSum, product) => {
        const optionTotal = product.options.reduce(
          (optionSum, option) => optionSum + option.unitSalePrice * option.count,
          0,
        );

        return productSum + optionTotal;
      }, 0),

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

  selectedCount: () => get().products.filter((product) => product.checked).length,

  totalOriginalPrice: () =>
    get()
      .products.filter((product) => product.checked)
      .reduce((sum, product) => {
        const optionTotal = product.options.reduce(
          (optionSum, option) => optionSum + option.unitOriginalPrice * option.count,
          0,
        );

        return sum + optionTotal;
      }, 0),

  totalSalePrice: () =>
    get()
      .products.filter((product) => product.checked)
      .reduce((sum, product) => {
        const optionTotal = product.options.reduce(
          (optionSum, option) => optionSum + option.unitSalePrice * option.count,
          0,
        );

        return sum + optionTotal;
      }, 0),

  totalDiscount: () => get().totalOriginalPrice() - get().totalSalePrice(),
}));
