This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Google Tag Manager (GTM)

This project includes site-wide GTM support. The GTM container ID is read from the environment variable `NEXT_PUBLIC_GTM_ID`.

- Default / fallback container ID used in the code: `GTM-TN54WWK3`.
- To override, set in your local environment (do not commit):

```bash
# .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Recommended GTM tags to create (initial setup):

- **GA4 Configuration**: Measurement ID `G-XXXXXXX` — fire on All Pages. This initializes GA4 for the site.
- **GA4 Event — link_click**: Event name `link_click` — map GTM built-in click variables to parameters:
	- `link_url` => `{{Click URL}}`
	- `link_text` => `{{Click Text}}`
	- `link_classes` => `{{Click Classes}}`
	Trigger: Link Click (or a Custom Event) scoped to the selector or `data-gtm` attribute you prefer.
- (Optional) Additional GA4 Event tags for CTA clicks or outbound link categories.

Testing & debug:

- Use GTM Preview (Tag Assistant) to test tags on `http://localhost:3000`.
- Check `window.dataLayer` in the browser console to see pushed events.
- Use GA4 DebugView / Realtime to confirm events arrive.

Files of interest:

- `src/app/components/GTMClient.tsx` — client-only component that initializes `dataLayer`, loads GTM, and pushes SPA `page_view` events on route change.
- `src/app/layout.tsx` — includes the GTM `noscript` iframe and mounts `GTMClient`.

If you want, I can add recommended `data-gtm` attributes to links or implement delegated click tracking in `GTMClient` to auto-push `link_click` events for a selector you choose.


