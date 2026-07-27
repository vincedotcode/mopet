# MoPet 🐾

**A pet adoption and donation platform — list animals for adoption, run donation campaigns, and find a vet nearby.**

[**Live**](https://mopet.vercel.app)
---

## What it does

**Adoption listings** — Shelters and owners post animals with photos, details and adoption status. Browse and filter to find a match.

**Donation campaigns** — Fundraising campaigns with Stripe checkout, tracked against a target.

**Vet finder** — Nearby veterinary services plotted on an interactive Leaflet map.

**Community forum** — Pet owners share experiences and ask for advice.

**Accounts** — Authentication via NextAuth, with bcrypt-hashed credentials.

**Email** — Transactional mail through Resend.

---

## Stack

A single Next.js application — the API routes and the frontend live in the same project, with MongoDB accessed directly through Mongoose.

**Framework** — Next.js 14 (App Router), TypeScript

**Styling** — Tailwind CSS, shadcn/ui on Radix primitives, `react-fast-marquee`

**Data** — MongoDB via Mongoose, `@faker-js/faker` for seeding

**Auth** — NextAuth + bcrypt

**Payments** — Stripe (`stripe` + `@stripe/react-stripe-js`)

**Maps** — Leaflet + React Leaflet

**Email** — Resend

**Forms & validation** — React Hook Form + Zod

**Charts** — Recharts

---

## Running locally

**Prerequisites:** Node.js 18+, a MongoDB database, and Stripe + Resend keys.

```bash
git clone https://github.com/vincedotcode/mopet.git
cd mopet
npm install
```

Create `.env.local`:

```bash
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
```

Then:

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Housekeeping

The `name` field in `package.json` is still `nextjs-starter-template` — a leftover from scaffolding. Worth changing to `mopet`.

---

## License

MIT — see [LICENSE](LICENSE).

## Contact

Vince Erkadoo — [vincedotcode.com](https://vincedotcode.com) · [vince@vincedotcode.com](mailto:vince@vincedotcode.com)
