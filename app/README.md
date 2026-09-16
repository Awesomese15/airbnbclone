# Stayfolio listing clone

An original, desktop-first vacation-rental listing implementation inspired by the supplied reference. It includes a React frontend, a small Java API, the listing view, photo tour, lightbox, architecture diagram, and AI workflow records.

## Run locally

```sh
cd frontend
npm install
npm run dev
```

In another terminal, start the optional API:

```sh
cd backend
javac -d out src/main/java/com/stayfolio/api/ListingApi.java
java -cp out com.stayfolio.api.ListingApi
```

The frontend works with built-in fallback data if the API is not running. With both processes active, Vite proxies `/api` to port `8080`.

## Build and verify

```sh
cd frontend && npm install && npm run build
cd ../backend && javac -d out src/main/java/com/stayfolio/api/ListingApi.java
```

Open the dev server at a **1440px** desktop viewport and exercise listing, photo tour, and lightbox flows.

See `../docs` for the implementation plan, reference audit, prompt history, and production-scale architecture.
