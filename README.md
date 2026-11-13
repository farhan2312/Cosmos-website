# COSMOS Innovation Labs website

Next.js (App Router) + Tailwind CSS v4 + React Three Fiber. Ported from the Lovable design.

## Development

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

- `src/app/` — routes (`/`, `/about`, `/technology`, `/services`, `/services/[slug]`, `/industries`, `/industries/[slug]`, `/resources`, `/contact`) and metadata. Service and industry pages are statically generated from `src/lib/cosmos-content.json`.
- `src/views/` — client-side page bodies.
- `src/components/cosmos/` — site components, SVG illustration generators and 3D scenes.
- `src/lib/cosmos-content.json` — all approved website copy (services, industries).
- `src/lib/contact-details.ts` — phone number shown on the contact page and footer.
- `src/lib/nav.tsx` — small `Link` / `ClientOnly` helpers on top of `next/link`.
- `src/app/globals.css` — design tokens and all page styling.

## Contact form

Enquiries are validated server-side in `src/app/api/contact/route.ts` and emailed via [Resend](https://resend.com).
Copy `.env.example` to `.env.local` (and add the same variables in Vercel → Project → Settings → Environment Variables):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key |
| `CONTACT_TO_EMAIL` | yes | Inbox(es) that receive enquiries, comma-separated |
| `CONTACT_FROM_EMAIL` | no | Sender, e.g. `COSMOS Website <website@yourdomain.com>` — the domain must be verified in Resend. Defaults to Resend's test sender, which can only deliver to your own Resend account email. |

Replies to an enquiry email go straight to the person who submitted it.
