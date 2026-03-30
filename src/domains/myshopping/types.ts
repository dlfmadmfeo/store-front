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
};

export type MyShoppingProfileSummary = {
  userName: string;
  profileLabel: string;
  rewardLabel: string;
  rewardValue: string;
  benefitLabel: string;
};

export type MyShoppingOrder = {
  id: string;
  status: string;
  orderedAt: string;
  title: string;
  priceLabel: string;
  sellerActionLabel: string;
  imageClass: string;
};

export type MyShoppingHomeData = {
  profile: MyShoppingProfileSummary;
  quickLinks: MyShoppingQuickLink[];
  likedProducts: MyShoppingLikedProduct[];
};

export type OrderFilter = "all" | "completed";

export type MyShoppingOrdersData = {
  orders: MyShoppingOrder[];
  totalCount: number;
  filter: OrderFilter;
  query: string;
};
