# Reference audit

## Evidence reviewed

- Assignment document pages 1–3, including the embedded 1440×860 listing, photo tour, and lightbox screenshots.
- Live reference URL in a browser. The initial Vercel verification screen cleared later in the session; the listing, photo tour, and lightbox were then reviewed visually and through their accessible controls.

## Desktop listing observations

- White canvas with a 72–88px header, light divider, coral brand, rounded search control, and small circular utility buttons.
- Centered content rail around 1120px wide on a 1440px viewport.
- A 24–28px dark title and right-aligned underlined Share/Save actions.
- The verified listing title is “Romantic Jacuzzi 1BHK Candolim | Mirashya UG10”; it has a 50% primary tile plus a two-column, two-row gallery. Tiles use a 10–12px radius only around the outer edge.
- A bordered “Show all photos” button overlays the lower-right tile. The lower page uses a two-column property/booking layout.

## Photo tour observations

- Full-screen white canvas; Back action, centered “Photo tour” title, share and save actions.
- Nine rounded category cards are shown near the top: Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, and Additional photos.
- Scrolling from a category moves through a room heading, amenities line, and a room-specific image mosaic.

## Lightbox observations

- White viewer with a centered photo, compact room title, “1 of 43” counter, close icon, faint previous control, and a circular next control.
- The viewer is intentionally sparse; controls sit away from the photo edges.

## Implementation notes

The implementation uses original AI-generated vacation-rental photography. Typography, spatial hierarchy, and interaction model follow the evidence, but exact original assets and runtime-only micro-interactions cannot be claimed while the source site is behind its verification checkpoint.

## Fidelity delta — 1440×860 baseline (local vs reference)

Live reference URL returned a Vercel browser verification interstitial during automated fetch; comparison uses assignment PDF screenshots, prior session notes, and local implementation at **1440×860**.

| Area | Reference | Local (before pass) | Target after fidelity pass |
|------|-----------|---------------------|----------------------------|
| Content rail | ~1120px centered | 1120px (`--content-width`) | Keep |
| Header | ~72–88px, sticky, coral logo | 80px sticky, PNG logo | Tune logo height and Manrope stack |
| Hero mosaic | 1 large + 4 tiles, outer radius only | 560×494 + 272×243, 8px gap | Keep geometry |
| Photo tour tabs | 9 categories, scroll-sync | 9 labels, IntersectionObserver | Keep |
| Tour mosaics | Lead + supporting tiles per room | 1 tile per room | **43 photos, multi-tile grids** |
| Lightbox counter | “1 of 43” | “1 of 9” | **43-item gallery** |
| Lightbox prev | Faint / low emphasis | Same weight as next | **Faint prev; bounded navigation** |
| Lightbox nav | ←/→ keyboard | Wrap-around | **Clamp at first/last** |
| Tour back | “Back” affordance | Icon-only back | **Labeled Back control** |
| Map block | Map imagery | Gradient placeholder | **Static map-style tile** |
| Gallery assets | Reference photography | 6 originals | **Crops + distinct room sets (no fake duplicates in counter)** |

### Verification checklist (desktop)

1. Listing: header, title row, hero hover, booking card sticky at scroll.
2. Photo tour: open from hero and “Show all photos”; tab jump; scroll updates tab.
3. Lightbox: open from tour tile; counter; prev faint on first; no wrap; Escape returns to tour.
4. Keyboard-only: Tab through header → tour → lightbox; focus restored on close.
5. `prefers-reduced-motion`: reduced transitions still usable.

## Fidelity pass (implemented)

- Gallery expanded to **43** lightbox items with multi-photo photo-tour mosaics per room (`app/frontend/src/data.js`).
- Lightbox: bounded prev/next (no wrap), faint previous control, labeled photo counter.
- Photo tour: labeled **Back** control, crop-aware imagery in grids.
- Listing: Manrope typography, logo sizing, guest-favorite and booking-card polish, OpenStreetMap static map tile for Candolim.
- Submission hygiene: root `.gitignore`, npm-aligned README, production build verified.
