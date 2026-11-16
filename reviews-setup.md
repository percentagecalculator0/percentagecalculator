# Reviews: setup, environment variables and how it works

## 1. Create the D1 database (once)
```
npx wrangler login
npx wrangler d1 create pic-reviews
```
Copy the printed `database_id` into `wrangler.jsonc` (`d1_databases[0].database_id`). Keep `"binding": "DB"`.

Create the tables (schema is in `migrations/0001_init.sql` and `0002_admin.sql`):
```
npx wrangler d1 migrations apply pic-reviews --remote
```
For local testing use `--local` instead of `--remote`.

Table `reviews`: id, name, rating (1-5), body, lang, status ('pending' | 'approved'), ip_hash, body_hash, created_at.
Table `admin_attempts`: ip_hash, at (used only to lock the admin login after 5 wrong passwords in 15 minutes).

## 2. Turnstile keys
Cloudflare dashboard -> Turnstile -> Add widget -> hostname `percentageincreasecalculator.net` -> mode "Managed".
You get a Site key (public) and a Secret key (private). For local testing, Cloudflare publishes dummy keys (already in `.env.example`).

## 3. Environment variables
| Name | Type | Where it is used |
|---|---|---|
| `ADMIN_SECRET` | Secret | Admin password for /admin (use 20+ random characters: `openssl rand -base64 24`) |
| `TURNSTILE_SECRET_KEY` | Secret | Server-side Turnstile check |
| `IP_HASH_SALT` | Secret | Salt for hashing IP addresses (`openssl rand -hex 32`). Never change it later unless you accept that rate-limit history resets |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Plain text, needed at BUILD time | Shows the Turnstile widget |
| `NEXT_PUBLIC_SITE_URL` | Plain text, needed at BUILD time | `https://percentageincreasecalculator.net` (no trailing slash) |
| `DB` | D1 binding (from wrangler.jsonc) | Database |

Add them in: Cloudflare dashboard -> Workers & Pages -> your project -> Settings -> Variables and Secrets.
Anything starting with `NEXT_PUBLIC_` is baked into the page at build time, so ALSO add it to the build settings of the project
(Settings -> Build -> Variables), then redeploy. Dashboard labels change from time to time; if you cannot find a screen, search the
Cloudflare docs for "Workers variables and secrets".
CLI alternative for secrets: `npx wrangler secret put ADMIN_SECRET` (repeat for the other two).

If `TURNSTILE_SECRET_KEY` or the database is missing in production, the review form refuses to save (it fails closed).

## 4. Moderation
Open `https://percentageincreasecalculator.net/admin`, enter `ADMIN_SECRET`. New reviews appear as PENDING. Press Approve to publish
or Delete to remove. Approved reviews appear on the reviews page of the language where they were written.
The admin page is `noindex`, disallowed in robots.txt, uses an HttpOnly + SameSite=Strict cookie (8 hours) and checks the Origin header on every action.

## 4b. Local development
- `npx vinext dev` (or `wrangler dev`): put secrets in a file named `.dev.vars` (same KEY=value format as `.env.example`). Never commit it (already in .gitignore).
- Plain `npm run dev` (Next.js only) has no D1; it uses an in-memory store that resets on every restart. It is never used in production.

## 5. What the server does with every submission (in this order)
1. Origin check (CSRF), JSON only, size limit.
2. Honeypot field: filled = silently dropped. Less than 3 s since the form appeared = asked to wait.
3. Validation: name 2-40 characters, review 20-500 characters, rating 1-5, control characters removed.
4. Link guard (normalises Unicode, strips zero-width characters, maps look-alike letters and dots, understands "dot"/"at" words, spaced letters, shorteners, emails, @handles, IPs, HTML and markdown) on the raw AND cleaned text.
5. Spam and profanity word lists (`src/lib/spam.ts`, starter lists: extend them).
6. Turnstile verification.
7. Rate limit: 3 reviews per hour per IP (IP stored only as a salted SHA-256 hash).
8. Duplicate check (hash of the normalised text).
9. Insert with parameterised SQL, status 'pending'.

## 6. Decisions
- Reviews are shown only on the language page where they were written. Showing them everywhere would put the same text on 8 pages (duplicate content) and mix languages.
- No AggregateRating / Review structured data was added anywhere. Google's guidelines restrict self-serving review markup and I have not re-confirmed an exception for this case, so it stays off.
- No ads are placed on the reviews page: it has little text until reviews accumulate, and user-generated pages are a common AdSense policy problem.

## 7. Data stored (for the privacy policy in Stage 5)
Name or nickname, star rating, review text, page language, timestamp, a salted one-way hash of the IP address, and a hash of the review text.
No email is collected. Cookies: `pic_lang` and `pic_lang_dismiss` (language preference, 1 year / 30 days). `pic_admin` is set only for the site owner.
Turnstile (Cloudflare) runs on the reviews page and may set its own cookies/storage.

## 8. Link-blocking test inputs (all must be rejected; the complete list of 52 is in tests/linkguard.test.ts)
```
Visit http://example.com for more        check https://spam.shop/offer now         ftp://files.example.org/a
go to www.example.com                    example.com                                my site is example dot com
site[dot]com                             site (dot) com                             buy at shop.xyz now
see mysite.ru                            promo.in                                   w w w . e x a m p l e . c o m
h t t p : / / evil . com                 mail me at john@example.com                follow @spammer_handle
bit.ly/3abcde                            t.co/xyz123                                tinyurl com abc
ｗｗｗ．ｅｘａｍｐｌｅ．ｃｏｍ                      exаmple.com  (Cyrillic "а")              exam<zero-width space>ple.com
<a href='x'>click</a>                    [click here](http://x.y)                   пример.рф
```
