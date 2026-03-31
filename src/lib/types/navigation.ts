export type SearchTrendStatus = "up" | "down" | "new" | "same";

export type SearchTrendItem = {
  rank: number;
  keyword: string;
  status?: SearchTrendStatus;
};

export type BenefitChip = {
  label: string;
};

export type SearchPanelData = {
  recentKeywords: string[];
  recommendKeywords: string[];
  benefitChips: BenefitChip[];
  trendKeywords: SearchTrendItem[];
};

export type SearchResultItem = {
  id: string;
  title: string;
  category: string;
  priceLabel: string;
  seller: string;
  badge?: string;
  deliveryLabel: string;
  imageAccent: string;
  imageUrl: string;
};

export type SearchResultsResponse = {
  query: string;
  totalCount: number;
  items: SearchResultItem[];
  relatedKeywords: string[];
};

export type CategoryMenuSection = {
  title: string;
  tone?: "green" | "mint" | "purple" | "default";
  imageUrl?: string;
};

export type CategoryMenuData = {
  primaryCategories: string[];
  featuredSections: CategoryMenuSection[];
  secondaryCategories: string[];
  detailCategories: string[];
};
