import type { CategoryMenuData, SearchPanelData, SearchResultsResponse } from "@/lib/types/navigation";
import { createMockImageDataUrl } from "@/lib/utils/mockImage";

export const mockSearchPanelData: SearchPanelData = {
  recentKeywords: ["말차", "웨딩 사회자", "LED 침대 프레임"],
  recommendKeywords: [
    "말차",
    "갤럭시S26",
    "코트",
    "케이스티파이",
    "닌텐도스위치2",
    "초콜릿 치즈케이크",
    "아이폰17",
    "루이비통",
  ],
  benefitChips: [
    { label: "스타일 위크 [3.9~15] 네이버 단독 특가" },
    { label: "브랜드 위크 최대 10% 적립" },
  ],
  trendKeywords: [
    { rank: 1, keyword: "말차", status: "same" },
    { rank: 2, keyword: "초콜릿 치즈케이크", status: "same" },
    { rank: 3, keyword: "케이스티파이", status: "same" },
    { rank: 4, keyword: "닌텐도스위치2", status: "same" },
    { rank: 5, keyword: "아이폰17", status: "same" },
    { rank: 6, keyword: "갤럭시S26", status: "same" },
    { rank: 7, keyword: "코트", status: "up" },
    { rank: 8, keyword: "루이비통", status: "up" },
    { rank: 9, keyword: "러닝화", status: "up" },
    { rank: 10, keyword: "침대 프레임", status: "new" },
  ],
};

export const mockCategoryMenuData: CategoryMenuData = {
  primaryCategories: [
    "가공식품",
    "신선식품",
    "간식",
    "건강식품",
    "생활용품",
    "유아동",
    "반려동물",
    "디지털",
    "가전",
    "가구",
    "조명/인테리어",
    "패션의류",
    "패션잡화",
    "뷰티",
    "스포츠/레저",
    "자동차용품",
    "취미/문구",
    "주방용품",
    "침구",
    "수납/정리",
    "공구",
    "전체보기",
  ],
  featuredSections: [
    {
      title: "지금 많이 찾는 상품",
      tone: "green",
      imageUrl: createMockImageDataUrl({
        label: "BEST NOW",
        startColor: "#0f9f6e",
        endColor: "#8ae6c1",
      }),
    },
    {
      title: "지금 가장 핫한 특가",
      tone: "mint",
      imageUrl: createMockImageDataUrl({
        label: "HOT DEAL",
        startColor: "#24c4a5",
        endColor: "#b3f1dd",
      }),
    },
    {
      title: "큐레이션 추천",
      tone: "purple",
      imageUrl: createMockImageDataUrl({
        label: "CURATION",
        startColor: "#6e54d9",
        endColor: "#c1b8ff",
      }),
    },
  ],
  secondaryCategories: [
    "생수/탄산수",
    "커피/차",
    "음료",
    "우유/두유/요거트",
    "치즈/유제품",
    "간편식",
    "즉석조리식품",
    "라면/면류",
    "과자/스낵",
    "아이스크림",
    "냉동식품",
    "통조림",
    "장류",
    "식용유/참기름",
    "가루/분말",
    "다이어트 식품",
    "유아식/이유식",
    "전체보기",
  ],
  detailCategories: ["생수", "탄산수", "전체보기"],
};

const mockSearchItems = [
  {
    id: "search-1",
    title: "프리미엄 말차 라떼 파우더 500g",
    category: "식품 > 커피/차",
    priceLabel: "18,900원",
    seller: "티랩 스토어",
    badge: "무료배송",
    deliveryLabel: "오늘 출발",
    imageAccent: "from-[#dce9cd] to-[#8cbf63]",
    imageUrl: createMockImageDataUrl({
      label: "MATCHA",
      startColor: "#dce9cd",
      endColor: "#8cbf63",
      textColor: "#18361d",
    }),
  },
  {
    id: "search-2",
    title: "원목 수납형 LED 침대 프레임",
    category: "가구 > 침실가구",
    priceLabel: "243,500원",
    seller: "우드프레임",
    badge: "베스트",
    deliveryLabel: "내일 도착 예정",
    imageAccent: "from-[#e9dccd] to-[#be9464]",
    imageUrl: createMockImageDataUrl({
      label: "BED FRAME",
      startColor: "#e9dccd",
      endColor: "#be9464",
      textColor: "#3b2a19",
    }),
  },
  {
    id: "search-3",
    title: "웨딩 전문 사회자 섭외 패키지",
    category: "서비스 > 웨딩",
    priceLabel: "140,300원",
    seller: "웨딩노트",
    badge: "추천",
    deliveryLabel: "상담 후 확정",
    imageAccent: "from-[#f4ecd9] to-[#d8b16a]",
    imageUrl: createMockImageDataUrl({
      label: "WEDDING",
      startColor: "#f4ecd9",
      endColor: "#d8b16a",
      textColor: "#4c3410",
    }),
  },
  {
    id: "search-4",
    title: "케이스티파이 아이폰17 투명 케이스",
    category: "디지털 > 휴대폰 액세서리",
    priceLabel: "72,000원",
    seller: "케이스티파이",
    deliveryLabel: "오늘 출발",
    imageAccent: "from-[#dfe5ef] to-[#7ea0d7]",
    imageUrl: createMockImageDataUrl({
      label: "CASE",
      startColor: "#dfe5ef",
      endColor: "#7ea0d7",
      textColor: "#1b3150",
    }),
  },
];

export function createMockSearchResults(query: string): SearchResultsResponse {
  const normalized = query.trim().toLowerCase();
  const items = normalized
    ? mockSearchItems.filter((item) =>
        [item.title, item.category, item.seller].some((value) =>
          value.toLowerCase().includes(normalized),
        ),
      )
    : mockSearchItems;

  return {
    query,
    totalCount: items.length,
    items,
    relatedKeywords: ["말차 파우더", "말차 디저트", "말차 라떼", "그린티"],
  };
}
