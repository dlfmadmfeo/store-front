# Architecture Notes

## Goal

Make the project look and behave more like a real customer-facing frontend service.

## Main Rules

1. UI components should not own raw fixture data when possible.
2. Domain data should flow through:
   `mock -> route handler -> api client -> hook/state -> page/component`
3. Shared types should live in `src/lib/types`.
4. Shared async state UI should live in `src/components/common`.

## Why

This makes the project easier to explain in portfolio reviews and interviews:

- data flow is explicit
- async behavior is visible
- domain boundaries are clearer
- later API replacement is cheaper

## Current Coverage

- MyShopping: migrated
- Home today event section: migrated
- Auth login/signup: migrated to route-backed mock APIs
- Cart seed data loading: migrated
- Basic route handlers: added for auth, cart, home, and myshopping
- Search panel, search results, and category menu: migrated

## Next Expansion Areas

- search domain
- category data flow
- product detail and checkout-like flows
