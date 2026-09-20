# Chicken Republic Restaurant Website

A responsive React + Vite restaurant website demo for Chicken Republic, Wurukum, Makurdi.

## Included

- Home page
- Menu with category filtering
- Cart and ordering flow
- Reservation form
- Gallery
- Contact/location page
- Responsive mobile navigation
- Accessible form controls
- Editable menu data
- Payment integration placeholder for Paystack/Flutterwave

## Important before going live

Menu prices were not supplied, so the site intentionally displays "Price TBC". Add the real prices in `src/main.jsx` by changing each menu item's `price` and the display logic.

The checkout is demo-only. Before accepting real payments, connect a secure backend and Paystack or Flutterwave using server-side credentials. Do not place secret API keys in frontend code.

The supplied Google-hosted images are used as image URLs. For a production client site, consider downloading/licensing approved assets and serving optimized local/CDN copies.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The output is generated in `dist/`.
