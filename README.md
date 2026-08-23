# DMK Solar

Website for DMK Solar built with React, TanStack Start, Vite and Tailwind CSS.

## Local development

    npm install
    npm run dev

## Production build

    npm ci
    npm run build

## Cloudflare deployment

The project uses the Cloudflare Nitro preset through `@lovable.dev/vite-tanstack-config`.

For Cloudflare connected Git/repository deployment use:

- Install command: `npm ci`
- Build command: `npm run build`
- Build output directory for static assets: `.output/public`

For Worker-style deployment after building, deploy the generated Cloudflare bundle from `.output/server` together with assets from `.output/public` according to the Cloudflare dashboard settings.

## Environment variables

Optional form endpoints can be overridden in Cloudflare environment variables:

- `VITE_CONTACT_ENDPOINT`
- `VITE_REFERRAL_ENDPOINT`
