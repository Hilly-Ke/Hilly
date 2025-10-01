# LearnHub

Modern learning platform built with Next.js App Router, Tailwind, Radix UI components, and Neon Postgres.

## Getting started

```bash
pnpm install
cp .env.example .env # fill in values
pnpm dev
```

## Required environment variables

- `DATABASE_URL`
- `JWT_SECRET`
- `BLOB_READ_WRITE_TOKEN`
- `NEXT_PUBLIC_APP_URL`

## Scripts

- `pnpm dev` – run development server
- `pnpm build` – build for production
- `pnpm start` – start production server
- `pnpm lint` – lint and typecheck

## Notes

- Admin and dashboard routes are protected by middleware; unauthenticated users are redirected to `/login`.
- API routes validate input with `zod` (example: files delete, materials upload).
