# Den House Group — Website & Admin Platform

Full-stack Next.js 15 application for **Den House Group**: a real-estate-first company website
(buy / sell / rent) with a secondary PG (paying guest) service, plus a password-protected admin
panel so the owner can manage listings without touching code.

> All company facts (address, phone, history, testimonials) are **placeholders**. Demo listings and
> photos are **sample data** (Lorem Picsum images) and must be replaced before launch.

## Tech stack

Next.js 15.1.11 (App Router, Server Components, Server Actions) · TypeScript (strict) · Tailwind CSS ·
Prisma + PostgreSQL (Supabase) · Auth.js v5 (Credentials) · Supabase Storage · React Hook Form + Zod ·
Framer Motion · lucide-react · Resend.

## Quick start

```bash
npm install                       # also runs `prisma generate`
cp .env.example .env              # then fill in values (see below)
npx prisma migrate dev --name init
npx prisma db seed                # demo listings + a local admin user
npm run dev                       # http://localhost:3000
```

Other commands: `npm run lint` · `npm run type-check` · `npm run build` · `npm run start` ·
`npx prisma studio`.

## Environment variables

See `.env.example` (annotated). Required: `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `AUTH_URL`,
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
`CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
Optional (buttons hide when empty): `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
`NEXT_PUBLIC_CONTACT_EMAIL`. Generate a secret with `npx auth secret`.

`SUPABASE_SERVICE_ROLE_KEY` is server-only (guarded by the `server-only` package) and must never be
prefixed `NEXT_PUBLIC_`.

## Project structure

```
prisma/            schema.prisma, seed.ts
src/
  app/
    (public)/      home, about, real-estate(/[slug]), pg(/[slug]), gallery, contact, privacy, terms
    admin/login    public login page
    admin/(panel)/ dashboard, properties, pg, inquiries, settings  (auth-checked layout)
    api/auth/      Auth.js handler
    sitemap.ts, robots.ts
  components/      ui/ layout/ home/ real-estate/ pg/ forms/ admin/
  lib/
    auth.config.ts edge-safe Auth.js config (used by middleware)
    auth.ts        full Auth.js config (Credentials + Prisma + bcrypt)
    data/          server-side read functions (getProperties, getPropertyBySlug, ...)
    actions/       Server Actions: every mutation calls requireAdminSession() first
    supabase/      server-only storage client + upload/delete helpers
    validations/   Zod schemas (shared by forms and server actions)
  data/            demo-properties.ts, demo-pg.ts (sample data, feeds the seed script)
  middleware.ts    redirects unauthenticated /admin/* to /admin/login
```

## How it fits together

- **Reads**: Server Components call `src/lib/data/*`, which query Prisma. Filters/sort/pagination
  come from validated URL query params, so search is real PostgreSQL querying, not client-side.
- **Writes**: admin forms post to Server Actions. Each action (1) re-checks the session,
  (2) re-validates with Zod, (3) writes via Prisma, (4) revalidates affected pages.
- **Auth**: middleware gives a fast redirect; the admin layout and every action re-check on the
  server. Passwords are bcrypt-hashed; sessions are signed JWT cookies.
- **Images**: uploaded through a Server Action (type + 5 MB validation) to Supabase Storage using
  the service-role key; only the public URL is stored in Postgres (`PropertyImage` / `PGImage`).
- **Contact form**: React Hook Form + Zod posts to the server-only `/api/contact` route, which sends
  email through Resend. The Resend API key is never exposed to the browser.

## Setup guides

**Supabase** — Create a project. Copy the pooled connection string (port 6543, add
`?pgbouncer=true`) to `DATABASE_URL` and the direct one (port 5432) to `DIRECT_URL`. Under Storage
create two **public** buckets: `property-images` and `pg-images`. Copy the project URL and
service-role key into `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.

**Admin account** — `npx prisma db seed` creates an admin from `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` (defaults exist for local dev only). For production set your own values
before seeding and change the password immediately. Log in at `/admin/login`.

**Resend** — Create a Resend account and API key. Verify the sending domain or email address, then
configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (the verified sender), and `CONTACT_TO_EMAIL` (the
inbox that should receive contact submissions). These are server-side variables; never use a
`NEXT_PUBLIC_` prefix for them.

**Vercel** — Import the repo, add every variable from `.env.example` (set `AUTH_URL` and
`NEXT_PUBLIC_SITE_URL` to your production URL), deploy. Run migrations against production with
`npx prisma migrate deploy` (using the direct URL) from your machine or CI.

**Going live checklist** — remove demo data (delete seeded listings in the admin), remove the
`picsum.photos` entry from `next.config.ts`, replace placeholder copy on About/Footer/Contact,
have Privacy/Terms reviewed by a professional.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `next/font` fetch error during build | Build machine has no access to fonts.googleapis.com |
| `prisma generate` 403 | Network blocks binaries.prisma.sh |
| Redirect loop on /admin | `AUTH_SECRET` / `AUTH_URL` missing or wrong |
| Image upload fails | Buckets missing/not public, or service-role key wrong |
| Contact form cannot send | Check `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`; redeploy after changing Vercel variables |

## Known limitations (deliberate scope cuts)

- Image **reordering** and alt-text editing are not implemented (upload, remove, set-main are).
- The public inquiry form is not persisted to the database; Resend delivers it to `CONTACT_TO_EMAIL`.
- No automated tests yet.
