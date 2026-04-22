export type PaymentMethodId = "card" | "bank" | "later";
export type CheckoutFlowStatus =
  | "idle"
  | "quoting"
  | "ready"
  | "quote-error"
  | "submitting"
  | "submit-error"
  | "success";

export type CheckoutOrderItem = {
  productId: number;
  optionId: number;
  count: number;
};

export type CheckoutSource = "web" | "app";

export type CheckoutQuoteRequest = {
  items: CheckoutOrderItem[];
  useAllPoints: boolean;
  selectedAddressId: string | null;
};

export type CheckoutQuoteSummary = {
  productOriginalAmount: number;
  productSaleAmount: number;
  couponDiscount: number;
  usedPoints: number;
  shippingFee: number;
  totalAmount: number;
  availablePoints: number;
  purchasePoint: number;
  reviewPoint: number;
  maxBenefit: number;
};

export type CheckoutQuoteResponse = {
  summary: CheckoutQuoteSummary;
  warnings: string[];
  serverValidatedAt: string;
};

export type CheckoutSubmitRequest = {
  requestId: string;
  items: CheckoutOrderItem[];
  selectedAddressId: string | null;
  selectedPaymentMethod: PaymentMethodId;
  useAllPoints: boolean;
  agreed: boolean;
  source: CheckoutSource;
};

export type CheckoutSubmitResponse = {
  orderId: string;
  requestId: string;
  totalAmount: number;
  approvedAt: string;
  message: string;
};
