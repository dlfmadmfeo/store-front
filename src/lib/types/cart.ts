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
