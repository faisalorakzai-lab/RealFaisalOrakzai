# Faisal Orakzai — Personal Brand Website

Cinematic personal brand website for Pakistani entrepreneur Faisal Orakzai, Founder & Chairman of Orakzai Group. Binance black+gold color scheme, blockchain orb, full Framer Motion animations, SEO-optimized.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Frontend: React + Vite, Tailwind CSS, Framer Motion
- 3D Orb: Canvas 2D (WebGL not available in Replit sandbox, so Three.js was replaced with Canvas 2D)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/faisal-os/src/pages/` — all page components (Home, Founder, Ecosystem, Projects, Research, Press, Contact)
- `artifacts/faisal-os/src/components/three/BlockchainOrb.tsx` — Canvas 2D blockchain orb (NOT Three.js WebGL — WebGL unavailable in Replit)
- `artifacts/faisal-os/src/components/layout/Navbar.tsx` — global nav with FO logo
- `artifacts/faisal-os/src/components/layout/Footer.tsx` — social links + ecosystem links
- `artifacts/faisal-os/src/index.css` — Binance colors, cyberpunk styles
- `artifacts/faisal-os/index.html` — full SEO meta tags + Schema.org Person markup

## Architecture decisions

- **Canvas 2D over Three.js**: Replit sandbox has no GPU/WebGL support. BlockchainOrb.tsx uses HTML5 Canvas 2D for the rotating globe effect — visually identical, no WebGL dependency.
- **Binance color scheme**: `#000000` background, `#F3BA2F` gold accent — defined as CSS custom properties in index.css.
- **Space Grotesk + Space Mono** fonts from Google Fonts for the cyberpunk aesthetic.
- **React + Vite** (NOT Next.js) — existing artifact kept; SEO handled via full meta tags in index.html + Schema.org structured data.
- **Framer Motion** for all page animations (fade/slide on scroll, parallax, hover effects).

## Product

Cinematic personal brand site for Faisal Orakzai. Pages:
- **Home** — Full-screen hero with live blockchain orb, manifesto, domains, quote, stats, CTA
- **About** — Bio (born 30 April 2006), ventures, principles, full career timeline
- **Ventures** — Orakzai Group ecosystem (companies list, click-to-expand)
- **Projects** — Selected work with category filter and detail modal
- **Research** — Whitepapers and research papers with type filter
- **Press** — Newsroom with lead story + sidebar layout
- **Contact** — Inquiry form + social/ecosystem links

## User preferences

- Binance brand colors only: black #000000 + gold #F3BA2F
- Personal brand focus — no complex OS interface
- Full SEO: every page keyword-optimized, Schema.org Person in index.html, Google Panel target
- All social links in Footer: LinkedIn, X, Instagram, TikTok, GitHub, Crunchbase, Pinterest, Facebook
- Ecosystem links: Orakzai Bond, Shamim Forever, Wikidata, EveryBodyWiki, ORCID, Hackernoon, Peerlist, F6S
- Content: factual, credible, no overhype — "Building", "developing", "leading" language
- React + Vite stack (NOT switching to Next.js)

## Gotchas

- **WebGL/Three.js WILL FAIL in Replit sandbox** — always use Canvas 2D for 3D effects, never `new THREE.WebGLRenderer()`
- `pnpm --filter @workspace/faisal-os run typecheck` to verify frontend types
- DB seeded with companies (6), projects (6), articles (6), research (5), news (6), media (6), timeline (13)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
