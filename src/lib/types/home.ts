export type PromoBadgeType =
  | "BRAND_DAY"
  | "SEASON_OFF"
  | "SUPER_DEAL"
  | "HOLIDAY_SHIP"
  | "SUPER_TODAY"
  | "SHOPPING_LIVE"
  | "ONLY_24H"
  | "TODAY_PICK";

export type PromoItem = {
  id: string;
  title: string;
  imageUrl: string;
  href?: string;
  badge?: {
    type: PromoBadgeType;
    label: string;
  };
  discountText?: string;
};
