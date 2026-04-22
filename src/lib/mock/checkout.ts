import { mockCartProducts } from "@/lib/mock/cart";
import type {
  CheckoutOrderItem,
  CheckoutQuoteResponse,
  CheckoutSubmitRequest,
  CheckoutSubmitResponse,
} from "@/lib/types/checkout";

const AVAILABLE_POINTS = 4587;
const SHIPPING_FEE = 0;
const approvals = new Map<string, CheckoutSubmitResponse>();

function getSelectedLineItems(items: CheckoutOrderItem[]) {
  return items
    .map((item) => {
      const product = mockCartProducts.find((candidate) => candidate.id === item.productId);
      const option = product?.options.find((candidate) => candidate.id === item.optionId);

      if (!product || !option || item.count <= 0) {
        return null;
      }

      return {
        product,
        option,
        count: item.count,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export function calculateCheckoutQuote(
  items: CheckoutOrderItem[],
  useAllPoints: boolean,
): CheckoutQuoteResponse {
  const selectedLineItems = getSelectedLineItems(items);
  const productOriginalAmount = selectedLineItems.reduce(
    (sum, item) => sum + item.option.unitOriginalPrice * item.count,
    0,
  );
  const productSaleAmount = selectedLineItems.reduce(
    (sum, item) => sum + item.option.unitSalePrice * item.count,
    0,
  );
  const couponDiscount = Math.min(270000, Math.floor(productSaleAmount * 0.18));
  const usedPoints = useAllPoints
    ? Math.min(AVAILABLE_POINTS, Math.max(productSaleAmount - couponDiscount, 0))
    : 0;
  const totalAmount = Math.max(productSaleAmount - couponDiscount - usedPoints + SHIPPING_FEE, 0);
  const purchasePoint = Math.floor(totalAmount * 0.01);
  const distinctProducts = new Set(selectedLineItems.map((item) => item.product.id)).size;
  const reviewPoint = Math.min(distinctProducts * 3300, 3300);
  const warnings: string[] = [];

  if (!selectedLineItems.length) {
    warnings.push("선택된 주문 상품이 없습니다.");
  }

  if (totalAmount === 0 && selectedLineItems.length > 0) {
    warnings.push("결제 금액이 0원입니다. 포인트와 할인 적용 내역을 다시 확인해 주세요.");
  }

  return {
    summary: {
      productOriginalAmount,
      productSaleAmount,
      couponDiscount,
      usedPoints,
      shippingFee: SHIPPING_FEE,
      totalAmount,
      availablePoints: AVAILABLE_POINTS,
      purchasePoint,
      reviewPoint,
      maxBenefit: purchasePoint + reviewPoint,
    },
    warnings,
    serverValidatedAt: new Date().toISOString(),
  };
}

export async function submitMockCheckout(
  payload: CheckoutSubmitRequest,
): Promise<CheckoutSubmitResponse> {
  if (approvals.has(payload.requestId)) {
    return approvals.get(payload.requestId)!;
  }

  const quote = calculateCheckoutQuote(payload.items, payload.useAllPoints);

  if (!payload.items.length) {
    throw new Error("주문할 상품을 먼저 선택해 주세요.");
  }

  if (!payload.selectedAddressId) {
    throw new Error("배송지를 선택해 주세요.");
  }

  if (!payload.agreed) {
    throw new Error("결제 진행을 위해 약관 동의가 필요합니다.");
  }

  if (quote.summary.totalAmount <= 0) {
    throw new Error("결제 금액이 올바르지 않습니다. 다시 계산해 주세요.");
  }

  const approvedAt = new Date().toISOString();
  const response: CheckoutSubmitResponse = {
    orderId: `order-${approvedAt.slice(11, 19).replaceAll(":", "")}`,
    requestId: payload.requestId,
    totalAmount: quote.summary.totalAmount,
    approvedAt,
    message:
      payload.source === "app"
        ? "앱 브리지 연결 전 단계까지 검증된 WebView 결제 흐름입니다."
        : "웹 결제 승인 직전 단계까지 검증된 흐름입니다.",
  };

  approvals.set(payload.requestId, response);
  return response;
}
