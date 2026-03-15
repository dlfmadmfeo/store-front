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
  imageUrl: string; // public 경로 or remote url
  href?: string;

  badge?: {
    type: PromoBadgeType;
    label: string;
  };

  // "67%↓" 같은 표시용
  discountText?: string;

  // 필요하면 나중에 가격/브랜드/평점 등 확장
};
