# charter-web

`charter-web` is adapted from `interdependence-web` from [verses-xyz](https://github.com/verses-xyz). We've removed functions relating to forking for a simple document signing app that stores offchain signatures on Arweave.

Running the application locally:

```
npm install
npm run dev
```

Deploying:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

Modifying the Charter:

- See `charter.json` for example JSON format
- Upload to Arweave via [arkb](https://github.com/textury/arkb)
- Set CANONICAL in `.env.local` to the resulting Arweave transaction ID (not the document URI)

```
yarn global add arkb
arkb deploy charter.json --tag-name charter_doc_type --tag-value charter --wallet ARWEAVE_KEY_FILE
```

This website is based on the Next.js + Tailwind CSS Example, using [Tailwind CSS](https://tailwindcss.com/) [(v2.2)](https://blog.tailwindcss.com/tailwindcss-2-2). It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).
