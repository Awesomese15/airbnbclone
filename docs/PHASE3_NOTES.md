# Phase 3 – Visual fidelity and interaction pass

This pass keeps the existing React/Vite + Java structure and focuses on the desktop reference fidelity and required interactions.

## Changes

- Tuned the 1120px content rail and hero mosaic to the measured desktop proportions used by the reference audit: 560x494 primary tile, four 272x243 tiles, 8px gaps.
- Tuned the listing content split to 652px main content + 60px gap + 408px reservation column.
- Tuned Photo Tour to a 976px column with two 458px halves and a 60px gutter; photo rhythm uses a 458x305 lead image with 223x149 supporting tiles when additional assets are available.
- Added the major lower-page listing sections: Where you'll sleep, amenities, reviews, location, host, and things to know.
- Kept the Java API optional and consistent with the React listing.
- Fixed Lightbox behavior so it overlays the Photo Tour instead of destroying it. Closing the Lightbox returns to the Photo Tour.
- Added IntersectionObserver-based category selection while scrolling the Photo Tour.
- Improved dialog focus handling, scrollbar compensation, live photo counter, modifier-key handling, and reduced-motion behavior.
- Kept the six locally supplied image assets. The project does not manufacture a fake 43-photo set by duplicating images.

## Reference-derived measurements

The measurements above are based on a public reproduction's documented live-reference measurements, not copied implementation code. The assignment itself remains the primary source of truth.
