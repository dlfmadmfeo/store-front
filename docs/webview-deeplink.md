# 웹뷰 / 딥링크 메모

## 왜 넣었는가

카카오뱅크 공고에서 말하는 `모바일웹 및 모바일 웹뷰 연동 개발 경험`을 프로젝트 안에서 설명할 수 있도록, 주문 화면에 웹뷰 진입 파라미터 처리를 추가했습니다.

실제 앱 환경이 아니어도 아래 관점을 코드로 보여주는 것이 목표입니다.

- 앱이 웹뷰를 열 때 어떤 정보를 URL로 넘길 수 있는가
- 웹 화면이 그 파라미터를 읽고 어떤 상태를 먼저 보여줄 것인가
- 고객이 앱에서 들어왔다는 맥락을 화면에 어떻게 전달할 것인가

## 현재 반영한 방식

주문 화면은 아래 쿼리 파라미터를 읽습니다.

- `entry`
- `filter`
- `orderId`
- `q`

예시:

```text
/myshop/orders?entry=app&filter=shipping&orderId=order-2
```

이 경로로 진입하면 아래 동작을 합니다.

- `entry=app`
  앱 웹뷰 진입 안내 배너를 노출합니다.
- `filter=shipping`
  주문 필터를 배송 관련 상태로 맞춥니다.
- `orderId=order-2`
  해당 주문 카드를 목록 상단으로 올리고 강조합니다.

지금은 이 URL을 주소창에 수동으로 넣지 않아도 됩니다.

- 운영 화면의 `앱 웹뷰 주문 화면으로 열기` 버튼이 딥링크를 생성합니다.
- 주문 화면의 `앱 웹뷰 진입 링크로 보기` 버튼도 같은 규칙으로 링크를 만듭니다.

즉, 단순히 파라미터를 읽는 데모가 아니라, 화면 내부에서 실제 진입 링크를 만들어 쓰는 흐름까지 포함했습니다.

## 관련 파일

- `src/lib/utils/myShoppingDeepLink.ts`
- `src/domains/operations/OrderOperationsPage.tsx`
- `src/domains/myshopping/MyShoppingOrders.tsx`
- `src/app/api/myshopping/orders/route.ts`
- `src/domains/myshopping/mockData.ts`

## 다음에 더 붙일 수 있는 것

- 웹뷰 전용 뒤로가기 처리
- 앱 버전 / 플랫폼 파라미터 분기
- 특정 탭 자동 열기
- 로그인 만료 시 앱 브리지 호출 가정 처리
