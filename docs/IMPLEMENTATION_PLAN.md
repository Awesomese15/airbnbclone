# Implementation plan

## Scope

Deliver a desktop-only original vacation-rental listing experience with the three assignment views: listing, photo tour, and lightbox. The supplied document and its embedded screenshots establish the layout and interaction targets. The live Vercel site was reached but showed a Vercel verification checkpoint during review, so direct inspection of its runtime controls was unavailable.

## Visual plan

1. Establish a 1440px desktop canvas, a 1120px centered content rail, a thin navigation bar, and the five-tile hero composition.
2. Recreate the reference hierarchy: title/actions, large rounded media grid, property summary, trust panel, and a sticky price card.
3. Build the photo tour as a white full-screen surface with a compact top navigation strip, room detail at left, and a staggered photo grid at right.
4. Build the lightbox as a sparse full-screen viewer with labeled close, counter, and previous/next controls.
5. Use a different, AI-generated property image set rather than extracting or reusing the reference photos.

## Interaction and accessibility plan

- Use semantic buttons, headings, image alt text, visible focus rings, and descriptive labels.
- Use modal dialog semantics, focus restoration, Escape to close, and ArrowLeft/ArrowRight navigation in the lightbox.
- Add restrained hover transforms, fades, and `prefers-reduced-motion` handling.
- Keep the booking and save controls visibly interactive without introducing out-of-scope checkout flows.

## Technical plan

- React + Vite for the focused client experience.
- A Java 17 `HttpServer` API provides a real listing endpoint while preserving the assignment's focused scope; React has static fallback data for one-command visual review.
- Put the production-scale system design, AI agent configurations, and prompt sequence in versioned submission files.

## Verification plan

1. Build the React bundle and compile the Java API.
2. Run both locally and inspect at a 1440px desktop viewport.
3. Exercise open/close, thumbnail selection, mouse navigation, keyboard navigation, and focus return.
4. Record the reference limitation and any fidelity implications.
