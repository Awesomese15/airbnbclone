# Submission Notes

## Included

- React/Vite frontend
- Optional dependency-free Java listing API
- Desktop Listing Page
- Photo Tour overlay with category navigation
- Lightbox with previous/next controls and keyboard navigation
- Accessibility/focus handling and reduced-motion support
- Production-scale architecture diagram
- AI workflow agent/skill configuration
- Prompt history and implementation notes

## Asset note

The implementation ships six original property image files. The photo tour and lightbox expose **43 gallery entries** via data-driven room mosaics; additional frames use distinct crops and metadata on those originals (no padded duplicate counter).

## Packaging

Zip `app/`, `docs/`, and `.gitignore` for submission. Exclude `node_modules/`, `dist/`, and `backend/out/` (install and build locally). A ready-made archive may be generated as `submission.zip` at the repository root.

## Verification

Run locally from `app/frontend`:

```bash
npm install
npm run build
npm run dev
```

The Java API can be compiled with the JDK without third-party dependencies:

```bash
cd app/backend && javac -d out src/main/java/com/stayfolio/api/ListingApi.java
```
