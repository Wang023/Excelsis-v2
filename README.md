# Excelsis — Dental AI marketing agency

A responsive, completely static Next.js website using the reference project's App Router, shared UI, and reusable sections. No backend or database is required.

## Develop

Use the existing checkout; no extra worktree is needed.

```sh
npm ci
npm run dev
```

## Build for GitHub Pages

```sh
npm run lint
NEXT_PUBLIC_BASE_PATH=/Excelsis npm run build
```

The generated `out/` directory contains the entire website. All pages and articles are exported, with repository-prefixed links and assets.

## Publish

In GitHub repository Settings → Pages, select **GitHub Actions** as the source. The included workflow builds and deploys on pushes to `main`. The expected address is https://wang023.github.io/Excelsis/ after a successful deployment.

## Contact without a backend

The form opens the visitor’s email app with a prepared message to `ganasehaki@gmail.com`; visitors must send it themselves. No messages are saved or sent by this site. Set the optional public GitHub Actions repository variable `NEXT_PUBLIC_CONTACT_EMAIL` to override the address. This is public contact information, not a secret.

For another hosting path, adjust `NEXT_PUBLIC_BASE_PATH` (empty for a root-domain site). No live server process is needed to host the export. Typography uses Google Fonts with system fallbacks.
