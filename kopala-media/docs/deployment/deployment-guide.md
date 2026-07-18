# Deployment Guide

## Build

```bash
npm install
npm run build      # outputs dist/
```

## Host requirements

Any static host (Netlify, Vercel, Cloudflare Pages, S3+CDN, cPanel). Because this
is a single-page app, the host must rewrite unknown paths to `index.html`:

- **Netlify** — add `public/_redirects` containing: `/* /index.html 200`
- **Vercel** — framework preset "Vite" handles it automatically
- **Cloudflare Pages** — automatic for SPAs
- **Nginx** — `try_files $uri /index.html;`

## Important: base path

The project builds with `base: './'` (relative assets) so it previews correctly
from any subpath. **For production at a domain root** (e.g. `https://kopalamedia.com`):

1. Set `base: '/'` in `vite.config.ts`
2. Rebuild
3. This makes deep links (`/services/...`, `/work/...`) load correctly on first hit.

## Domain & DNS

1. Confirm the production domain, then set it in `src/config/site.ts` (`site.url`).
2. Update `public/sitemap.xml` and `public/robots.txt` with the real domain.
3. Point DNS at the host:
   - Apex: `A` record to the host's anycast IP (or ALIAS/ANAME where supported)
   - `www`: `CNAME` to the host's target
4. Enable HTTPS (host-issued certificate). Force HTTPS + redirect `www` ↔ apex per preference.
5. Verify in Google Search Console and submit `sitemap.xml`.

## Security headers (recommended host config)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY   (or frame-ancestors for the booking embed, when added)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data:; script-src 'self'
```
(Loosen `script-src` when GTM/analytics is activated — document the change.)

## Rollback

- Keep the previous `dist/` folder (or host deployment) available; redeploy it to roll back.
- On Netlify/Vercel, use the platform's one-click "rollback to previous deploy".
- Content/config changes: revert the single file in `src/config` or `src/content` and redeploy.

## Backups

- Source of truth: this repository (keep it in version control off-machine).
- Lead data: export CSV/JSON from `/admin` on a schedule (see docs/operations/).
