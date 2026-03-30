# Accessibility Notes

## Current Direction

The project is being updated to include baseline accessibility support:

- `aria-label` on icon-only buttons
- `aria-current` for active navigation
- `aria-pressed` for filter/toggle buttons
- visible keyboard focus using `focus-visible`
- clearer heading structure on major pages

## Gaps Still Remaining

- broader keyboard navigation review
- color contrast review
- form validation messaging consistency
- hover-only interaction fallbacks
- semantic landmark review across layouts

## Recent Improvements

- signup and login forms now have clearer labels and submit feedback
- category menu and myshopping popovers expose menu labels and focus targets
- search and category landing pages provide explicit headings and empty/error states

## Review Checklist

- Can the page be used with keyboard only?
- Can icon-only controls be understood by screen readers?
- Is active navigation announced?
- Are loading and error states understandable without visuals only?
