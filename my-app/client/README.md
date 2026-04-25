# Huevos Express PR — Client

React frontend for Huevos Express PR, a local egg delivery business in Toa Baja, Puerto Rico.

## Tech Stack

- **React 18** with Vite
- **Material UI (MUI)** for UI components
- **React Router v7** for client-side routing
- **@react-google-maps/api** for Google Maps integration
- **PWA** support with service worker

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Previews the production build locally.

## Environment Variables

Create a `.env` file in the client folder with the following variables:
VITE_API_BASE_URL=your_backend_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_MAPS_ID=your_google_maps_id
VITE_PLACE_ID=your_google_place_id

## Project Structure
src/
├── components/      # Reusable UI components
├── context/         # React context providers (Auth, Business)
├── pages/           # Page components
├── config.js        # Shared configuration (API base URL, etc.)
└── index.jsx        # App entry point
## Features

- Product carousel with responsive layout
- Google Maps with custom marker
- Google Reviews widget
- Business hours in Spanish (12h format)
- Mi Historia and Mis Héroes slideshows with pause on hover/touch
- Order form with email and SMS notifications
- PWA — installable on mobile devices
- Error boundaries for graceful error handling

## Deployment

Deployed on **Vercel**. The backend API is hosted separately on **Render**.
