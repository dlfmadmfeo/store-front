export type MyShoppingMenuSection = {
  title: string;
  path?: string;
  items: string[];
};

export type MyShoppingQuickLink = {
  title: string;
  icon: string;
  path?: string;
};

export type MyShoppingLikedProduct = {
  id: string;
  brand: string;
  title: string;
  priceLabel: string;
  accent: string;
  badge: string;
  imageUrl: string;
};

export type MyShoppingProfileSummary = {
  userName: string;
  profileLabel: string;
  rewardLabel: string;
  rewardValue: string;
  benefitLabel: string;
};

export type OrderStatus =
  | "구매확정완료"
  | "배송준비중"
  | "배송중"
  | "교환접수"
  | "환불처리중";

export type MyShoppingOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  orderedAt: string;
  title: string;
  priceLabel: string;
  sellerActionLabel: string;
  imageClass: string;
  paymentMethod: string;
  shippingAddress: string;
  managementMemo: string;
  channel: "web" | "app";
};

export type MyShoppingHomeData = {
  profile: MyShoppingProfileSummary;
  quickLinks: MyShoppingQuickLink[];
  likedProducts: MyShoppingLikedProduct[];
};

export type OrderFilter = "all" | "completed" | "shipping" | "issue";

export type MyShoppingOrdersData = {
  orders: MyShoppingOrder[];
  totalCount: number;
  filter: OrderFilter;
  query: string;
};
