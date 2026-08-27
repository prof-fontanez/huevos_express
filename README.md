# Huevos Express PR — Client

React frontend for Huevos Express PR, a local egg delivery business in Toa Baja, Puerto Rico.

## Tech Stack

- **React 18** with Vite
- **Material UI (MUI)** for UI components
- **React Router v7** for client-side routing
- **@react-google-maps/api** for Google Maps integration
- **Google Tag Manager** for analytics

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Previews the production build locally.

## Environment Variables

Create a `.env` file in the client folder with the following variables:

## Overview
This site is built to showcase product photos for a small business. It features a React frontend and a server that 
fetches hours of operation from Google Places API. It also fetches Google Reviews using Google services.

This project is currently private and for internal use only, since I am, and most likely will be, the sole contributor.

## License
No license. But as the sole developer, I hold all rights to this software.

## Usage
This app is for a small business owner to be used for commercial purposes. 

## Notes / To-Do
- Add image upload functionality
- Separate folders for client and server code (with modification of start process to start client and server simultaneously)
- Implement user authentication for admin panel
- Implement portal to update prices from admin panel
- Implement some form of real-time update if prices change (could be polling, but would prefer a more dynamic way for this)

All rights reserved. This software is the proprietary property of Hector Fontanez and Huevos Express PR and may not be copied, modified, or distributed without written permission.


## Project Structure

src/
├── components/ # Reusable UI components
│ ├── BusinessAddress.jsx
│ ├── BusinessHours.jsx
│ ├── CheckoutDialog.jsx
│ ├── EmbeddedReviews.jsx
│ ├── ErrorBoundary.jsx
│ ├── EventCard.jsx
│ ├── GoogleMapsWidget.jsx
│ ├── Header.jsx
│ ├── HistoryGallery.jsx
│ ├── HeroesGallery.jsx
│ ├── Layout.jsx
│ ├── MonthSection.jsx
│ ├── OrderForm.jsx
│ ├── PageTabs.jsx
│ ├── ProductBox.jsx
│ ├── ProductForm.jsx
│ ├── ProductFormActions.jsx
│ ├── ProductPayment.jsx
│ ├── ProductQrPayment.jsx
│ ├── ProductSelector.jsx
│ ├── Ticker.jsx
│ └── YearSection.jsx
├── context/ # React context providers
│ ├── AuthContext.jsx
│ └── BusinessContext.jsx
├── pages/ # Page components
│ ├── Activities.jsx
│ ├── MyHeroes.jsx
│ ├── MyHistory.jsx
│ ├── Product.jsx
│ └── ProductAdmin.jsx
├── utils/ # Utility functions
│ └── eventUtils.js
├── config.js # Shared configuration (API base URL, IS_DEV)
└── index.jsx # App entry point


## Features

### Product Management
- Responsive product carousel (1/2/3 cards based on screen size)
- Skeleton loading while products fetch
- Product admin page for CRUD operations with tooltip support
- Payment product selector with checkout dialog

### Payment (SumUp Integration — pending API credentials)
- Product selection dropdown filtered by products with prices
- Checkout dialog showing product details, IVU (11.5%), and total
- SumUp Hosted Checkout integration ready — redirects to SumUp's hosted payment page
- No card data stored or handled by the app — fully PCI compliant via SumUp

### Business Information
- `BusinessContext` — single API call shared across all business components
- Business hours displayed in Spanish with 12h format
- Google Maps with custom `AdvancedMarkerElement` pin
- Google Reviews carousel with overall rating, total review count, and "leave a review" button
- Business address with formatted Puerto Rico address display

### Activities / Events
- Events fetched from Google Sheets
- Recurring events support (DAILY, WEEKLY, MONTHLY) via `expandRecurringEvents`
- Events grouped by year and month
- Google Calendar integration per event
- Fried egg themed event cards

### Slideshows
- Mi Historia — fadeshow with pause on hover/touch
- Mis Héroes — fadeshow with pause on hover/touch
- Accurate timer resumption when hover/touch ends

### Security & Performance
- AES-256-CBC encrypted database password
- Image compression (all images under 150KB)
- Next image preloading for smooth slideshow transitions
- Error boundary for graceful error handling
- All Dependabot alerts resolved

### SEO
- Open Graph and Twitter meta tags
- Sitemap submitted to Google Search Console
- `lang="es"` on HTML element

## Architecture Notes

- `src/config.js` — shared `API_BASE_URL` and `IS_DEV` constants used across all components
- `src/context/BusinessContext.jsx` — fetches `/business` once and shares data with `BusinessHours`, `GoogleMapsWidget`, and `EmbeddedReviews`
- `src/context/AuthContext.jsx` — handles admin authentication with JWT
- Google Tag Manager (`GTM-PQFCPS2M`) handles analytics

## Deployment

- **Client** — deployed on **Vercel** (Framework: Vite, Root: `my-app/client`)
- **Server** — deployed on **Render**
- **Database** — MySQL hosted on **Kamatera**

## Security Notes

- All Dependabot alerts resolved
- Database password encrypted with AES-256-CBC before storage in `.env`
- No payment card data is stored or processed by this app — handled entirely by SumUp
- `.env` files are in `.gitignore` and never committed

## Pending

- SumUp API credentials — contact SumUp to set up merchant account and obtain API key
- Add `SUMUP_API_KEY` and `CLIENT_URL` to server `.env` files and Render environment variables once credentials are available


