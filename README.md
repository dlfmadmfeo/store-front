# store-front

`store-front` is a Next.js App Router storefront practice project.

The current refactor direction is to turn the project from a UI mock collection into a more production-like frontend codebase that can better demonstrate:

- API layer separation
- mobile web support
- accessibility basics
- architecture rationale and documentation

## Run

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Project Direction

This project is being reorganized around four core themes:

1. API structure
2. Mobile web quality
3. Accessibility
4. Documented architecture decisions

## Shared Structure

New shared folders were introduced under `src`:

- `lib/api`
  Domain API clients that call route handlers
- `lib/mock`
  Mock payloads used behind the route handlers
- `lib/types`
  Shared domain types
- `components/common`
  Reusable loading, empty, and error state UI

Route handlers were also added under `src/app/api` so the client-side code now follows:

- `mock data`
- `route handler`
- `lib/api fetch client`
- `hook or store`
- `page/component`

## Domains Already Moved

### MyShopping

`src/domains/myshopping` now follows:

- typed mock data
- async fetch layer
- loading / error / empty states
- mobile navigation
- focus-visible and aria improvements

### Home

The home event section now uses:

- `src/lib/api/home.ts`
- `src/lib/mock/home.ts`
- `src/domains/home/hooks/useTodayEventsData.ts`

This gives the page a real async data flow instead of direct in-component constants.

### Cart

The cart store now receives product data from:

- `src/lib/api/cart.ts`
- `src/lib/mock/cart.ts`

The cart page also shows loading and error states before rendering the cart UI.

### Auth

Login now uses the shared auth API entry and a mock route:

- `src/lib/api/auth.ts`
- `src/lib/mock/auth.ts`
- `src/lib/types/auth.ts`
- `src/app/api/auth/login/route.ts`

Signup now follows the same direction:

- `src/lib/api/signup.ts`
- `src/lib/mock/signup.ts`
- `src/lib/types/signup.ts`
- `src/app/api/auth/signup/route.ts`

### Search and Category

Search and category navigation now also use route-backed mock APIs:

- `src/lib/api/navigation.ts`
- `src/lib/mock/navigation.ts`
- `src/lib/types/navigation.ts`
- `src/app/api/navigation/...`
- `src/app/api/search/route.ts`
- `src/app/(public)/search/page.tsx`
- `src/app/(public)/category/page.tsx`

## Why This Matters

This structure makes it easier to explain the project in interviews:

- where data comes from
- how UI reacts to loading and failure
- how mobile behavior is considered
- how shared types reduce duplication

It also lowers the cost of switching from mock data to real REST APIs later.

## Next Steps

- move more hardcoded UI data out of domain components
- improve responsive behavior across all major pages
- run a project-wide accessibility pass
- add more explicit docs under `docs/`
