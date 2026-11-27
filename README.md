# Percentage Increase Calculator

Next.js 16 site deployed to Cloudflare Workers with the OpenNext adapter.

- `npm test` runs the calculator and content tests.
- `npm run build` builds the site. `npm run check:links` then verifies there are no external or broken links.
- Cloudflare build command: `npm run build:cf`
- Cloudflare deploy command: `npm run deploy:cf`

Edit your contact email in `src/lib/site.ts`. Add AdSense values as build variables (see `.env.example`).

## Search engine settings

- `SITE_NOINDEX=true` (Cloudflare build variable) adds a noindex tag to every page. Remove it to allow indexing.
- Pages served from `*.workers.dev` always send `X-Robots-Tag: noindex`, so only the real domain is indexed.
- `robots.txt` cannot contain `noindex`. It only controls crawling.
- `/llms.txt` and `/llms-full.txt` are generated from the page content at build time.
