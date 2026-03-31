# store-front

`store-front`는 Next.js App Router 기반으로 구축한 커머스형 프론트엔드 프로젝트입니다.

단순히 화면을 구현하는 데서 끝내지 않고, 대고객 서비스에 가까운 구조와 품질을 갖춘 프론트엔드로 발전시키는 것을 목표로 리팩터링했습니다.

핵심적으로는 아래 4가지 축에 집중했습니다.

- API 구조 분리
- 모바일웹 대응
- 접근성 개선
- 설계 근거 문서화

추가로 주문 관리 운영 화면, 웹뷰 딥링크 처리, 초기 렌더링과 이미지 로딩 최적화까지 반영해 고객용 화면과 운영용 화면을 함께 다루는 프론트엔드 구조를 만들었습니다.

## 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 확인할 수 있습니다.

## 프로젝트 방향

이 프로젝트는 아래 기준으로 전반 구조를 재정비했습니다.

1. 화면 컴포넌트 안에 하드코딩 데이터를 직접 두지 않기
2. `mock -> route handler -> lib/api -> hook/store -> page` 흐름으로 데이터 경계 만들기
3. 공통 타입과 공통 상태 UI를 재사용 가능하게 분리하기
4. 모바일과 접근성을 화면 단위가 아니라 프로젝트 전반 품질로 다루기

## 공통 구조

`src` 아래에 다음 공통 계층을 두었습니다.

- `lib/api`
  도메인별 API 호출 함수
- `lib/mock`
  route handler 뒤에서 사용하는 mock 데이터
- `lib/types`
  공통 타입 정의
- `components/common`
  로딩, 빈 상태, 에러 상태 같은 공통 UI

또한 `src/app/api` 아래에 route handler를 추가해, 클라이언트 코드가 실제 HTTP 경계를 거치는 구조로 정리했습니다.

## 현재 반영된 도메인

### 마이쇼핑

`src/domains/myshopping`은 아래 흐름을 따릅니다.

- typed mock data
- 비동기 fetch 계층
- loading / error / empty 상태 분리
- 모바일 전용 내비게이션
- 포커스와 aria 기반 접근성 보강

### 홈

홈의 오늘의 이벤트 영역은 아래 구조를 사용합니다.

- `src/lib/api/home.ts`
- `src/lib/mock/home.ts`
- `src/domains/home/hooks/useTodayEventsData.ts`

즉, 화면 내부 상수 대신 비동기 데이터 흐름을 따르도록 정리했습니다.

### 장바구니

장바구니는 아래 구조로 데이터를 받습니다.

- `src/lib/api/cart.ts`
- `src/lib/mock/cart.ts`

또한 화면 진입 시 loading / error 상태를 먼저 처리한 뒤 UI를 렌더링합니다.

### 인증

로그인은 아래 구조를 따릅니다.

- `src/lib/api/auth.ts`
- `src/lib/mock/auth.ts`
- `src/lib/types/auth.ts`
- `src/app/api/auth/login/route.ts`

회원가입도 같은 방향으로 정리했습니다.

- `src/lib/api/signup.ts`
- `src/lib/mock/signup.ts`
- `src/lib/types/signup.ts`
- `src/app/api/auth/signup/route.ts`

### 검색 / 카테고리

검색 패널, 검색 결과, 카테고리 메뉴 역시 route handler 기반 mock API 구조를 따릅니다.

- `src/lib/api/navigation.ts`
- `src/lib/mock/navigation.ts`
- `src/lib/types/navigation.ts`
- `src/app/api/navigation/...`
- `src/app/api/search/route.ts`
- `src/app/(public)/search/page.tsx`
- `src/app/(public)/category/page.tsx`

### 운영 도구성 화면

카카오뱅크 공고의 `운영 도구 개발 및 관리 효율화` 항목을 의식해서 주문 운영 관리 화면을 추가했습니다.

- `src/app/(public)/ops/orders/page.tsx`
- `src/domains/operations/OrderOperationsPage.tsx`
- `src/lib/api/operations.ts`
- `src/app/api/operations/orders/route.ts`

이 화면에서는 아래 흐름을 한 번에 보여줄 수 있습니다.

- 주문 검색
- 상태별 필터링
- 웹 / 앱 유입 채널 분리
- 운영 메모 수정
- 주문 상태 변경

즉, 대고객 화면뿐 아니라 운영 관점의 프론트엔드 화면도 함께 설계했다는 점을 보여줄 수 있습니다.

### 웹뷰 / 딥링크 진입

모바일웹과 앱 웹뷰 경계 경험을 보여주기 위해 마이쇼핑 주문 화면에 딥링크 진입 처리를 추가했습니다.

- 예시 진입 경로
  `/myshop/orders?entry=app&filter=shipping&orderId=order-2`

적용한 동작은 아래와 같습니다.

- `entry=app`이면 웹뷰 진입 안내 배너 노출
- `orderId`가 있으면 해당 주문 카드를 상단으로 올리고 강조 표시
- `filter` 값으로 주문 상태 탭 초기값 맞춤
- 운영 화면에서 선택한 주문을 `앱 웹뷰 주문 화면으로 열기` 버튼으로 바로 확인 가능
- 주문 화면 안에서도 `앱 웹뷰 진입 링크로 보기` 버튼으로 링크 생성 방식 확인 가능

관련 구현은 아래 파일에 있습니다.

- `src/domains/myshopping/MyShoppingOrders.tsx`
- `src/app/api/myshopping/orders/route.ts`
- `src/domains/myshopping/mockData.ts`

## 왜 이렇게 정리했는가

이 구조를 통해 포트폴리오나 면접에서 아래 내용을 분명하게 설명할 수 있습니다.

- 데이터가 어디서 오고 어디서 소비되는지
- 로딩과 실패 상황에서 UI가 어떻게 반응하는지
- 모바일웹을 어디까지 고려했는지
- 공통 타입과 공통 상태 UI를 어떻게 재사용했는지
- 운영 화면과 고객 화면을 어떤 기준으로 나눴는지
- 앱 웹뷰 진입 시 URL 파라미터를 화면 상태에 어떻게 연결했는지

또한 나중에 mock 데이터를 실제 REST API로 바꿀 때 수정 범위를 줄이는 데도 도움이 됩니다.

## 다음 보강 후보

- 남아 있는 하드코딩 UI 데이터 더 분리하기
- 모바일웹 품질을 화면별로 더 정교하게 다듬기
- 접근성 전수 점검 계속 진행하기
- `docs/` 아래 설계 문서를 더 구체적으로 확장하기

## 최근 성능 최적화

- 홈 이벤트 영역을 클라이언트 fetch에서 서버 렌더링으로 전환해 초기 로딩 비용을 줄였습니다.
- 메인 배너 캐러셀은 동적 import로 분리해 초기 번들 부담을 낮췄습니다.
- 이벤트 카드 이미지는 `next/image`의 `sizes`, `priority`를 활용해 첫 화면 이미지 로딩 전략을 보강했습니다.
- 검색 결과, 카테고리, 마이쇼핑 홈은 서버 컴포넌트로 내려서 불필요한 클라이언트 fetch와 hydration 범위를 줄였습니다.
- 장바구니 상품 카드 렌더링은 카드 단위로 분리해, 수량 변경 시 전체 목록이 과하게 다시 그려지지 않도록 정리했습니다.
- 주문/운영 검색 입력은 debounce를 적용해 타이핑 중 불필요한 요청과 재렌더를 줄였습니다.
- 정적인 탐색 데이터는 `force-cache`, `revalidate`, route handler 캐시 헤더를 적용해 캐싱 전략을 분리했습니다.
- 운영 화면과 마이쇼핑 주문 화면, GNB 팝오버는 동적 import로 분리해 처음부터 모든 코드를 한 번에 싣지 않도록 조정했습니다.
- 장바구니, 마이쇼핑, 검색 결과, 카테고리 큐레이션 영역은 `next/image` 기반으로 이미지 전략을 넓혔습니다.
