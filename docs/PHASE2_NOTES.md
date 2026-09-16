# Phase 2 — Gallery architecture

## What changed

- Introduced `listing.rooms` as the source of truth for Photo Tour sections.
- Introduced `galleryPhotos` as a flattened list for Lightbox navigation.
- Added the nine room/space labels from the project reference audit:
  - Living room 1
  - Living room 2
  - Full kitchen
  - Bedroom
  - Full bathroom
  - Gym
  - Exterior
  - Pool
  - Additional photos
- Hero images now open the corresponding Photo Tour section instead of relying on an array index.
- Photo Tour category tabs scroll to the associated room section.
- Lightbox navigation works across the flattened gallery data set.
- Accessibility behavior remains centralized in `useDialogAccessibility`.

## Asset limitation

The current project contains six source property images. Phase 2 intentionally does **not** fabricate a 43-photo counter by duplicating assets. Some reference categories therefore temporarily reuse the closest available source asset. Replace those entries with the remaining original/reference-matching assets when available; no component changes should be required.

## Verification

A fresh frontend build could not be executed in this environment because npm dependencies are not installed and the environment cannot reach the npm registry. The source was updated without changing the package contract. Run `npm install` (or the project's preferred package-manager install) followed by `npm run build` locally before submission.
