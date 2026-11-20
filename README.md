# Percentage Increase Calculator

Next.js 16 site deployed to Cloudflare Workers with the OpenNext adapter.

- `npm test` runs the calculator and content tests.
- `npm run build` builds the site. `npm run check:links` then verifies there are no external or broken links.
- Cloudflare build command: `npm run build:cf`
- Cloudflare deploy command: `npm run deploy:cf`

Edit your contact email in `src/lib/site.ts`. Add AdSense values as build variables (see `.env.example`).
