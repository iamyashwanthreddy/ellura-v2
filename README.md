# ellura® India — v2 storefront (Love Wellness–inspired redesign)

A complete, separate redesign of the ellura® India store. The v1 build in `../Ellura` is untouched; this folder is its own Vite project (dev server on port **5174**) on git branch `redesign-love-wellness`, so both can run side by side for comparison.

```bash
npm install
npm run dev       # http://localhost:5174  (/ redirects to /ellura)
npm run build     # type-check + production build → dist/
```

## What changed vs v1
- **Design system** (`src/styles/tokens.css`): plum (logo) + lilac (carton) base with berry, blush, butter, sage and periwinkle accents; Bricolage Grotesque / Figtree / Instrument Serif italic; 28–36 px radii, pill buttons, ink-outlined “sticker” cards with offset shadows.
- **Homepage** follows the supplied doc order (Hero → UGC loop → US→India + urologist → How ellura works → How it is different → Take control → Rewards) with added shop (stacked pack cards), habits (pinned horizontal scroll), US-store reviews rail, learn bento, FAQ and references.
- **Shopping**: product cards with quick-add, mega-menu, drawer cart, PDP with tinted gallery (zoom, swipe, keyboard), pack/purchase selectors, sticky buy bar, cart, checkout (preview) and confirmation.
- **GSAP** (ScrollTrigger + SplitText, via `useGSAP`, all scoped and reverted on unmount; `gsap.matchMedia` gates everything by `prefers-reduced-motion` and breakpoint): hero reveal/parallax, scrubbed mechanism diagram, stat count-ups, anti-adhesion chart, route draw, pinned horizontal habits and timeline, sticky stacked pack cards, marquee, gallery transitions, button micro-interactions.

## Commerce integration (still needs credentials)
Unchanged from v1: everything network-backed goes through `src/commerce/adapter.ts`. Until the e-commerce platform and payment gateway are chosen, checkout, promo codes, tracking, accounts, reviews, newsletter, notify-me and support forms run as clearly labelled **previews** (no payment, no order, no email). Open content items are listed in `content-sources.md` and shown on the site as “To be confirmed”.
