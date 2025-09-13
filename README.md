# Weather App (Next.js + Tailwind) deployed link is https://weather-app-opfn.vercel.app/

A responsive, animated weather application powered by the OpenWeather API. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Radix UI primitives. Includes rich UI polish: weather-aware gradients, glassmorphism surfaces, subtle motion, dark/light themes, search suggestions, geolocation, and a 5-day/24-hour forecast.

## Demo

- Local: `npm run dev` then open the printed URL.

## Features

- Live Current Weather and 5-Day/24-Hour Forecast
- Weather-aware dynamic background gradients (day/night variants)
- Elegant light/dark themes (theme toggle in Settings)
- Search with typeahead suggestions (OpenWeather Geo API)
- Fetch by city or precise coordinates
- Geolocation quick action
- Recent searches
- Rich, accessible UI (Radix, Tailwind, motion)
- Fully responsive layouts for mobile → desktop

## Tech Stack

- Framework: Next.js 13 App Router + TypeScript
- Styling: Tailwind CSS, tailwind-merge, tailwindcss-animate
- UI: Radix UI, shadcn-inspired components, lucide-react icons
- Animations: framer-motion

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Configure environment

Create `.env.local` at the project root and set your OpenWeather API key. Example:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
```

Notes:
- Keys from OpenWeather can take several minutes to activate
- You must restart the dev server after changing `.env.local`

3) Run the dev server

```bash
npm run dev
```

Open the URL from the terminal (typically http://localhost:3000).

## Available Scripts

- `npm run dev` – Run in development (hot reload)
- `npm run build` – Production build
- `npm run start` – Start production server (Node)
- `npm run lint` – Lint code

## Project Structure

```
app/
  page.tsx                # Main UI and composition
components/
  ForecastCard.tsx        # 5-day & 24-hour forecast
  WeatherCard.tsx         # Current weather card with stats
  WeatherBackground.tsx   # Weather-aware gradient + particles
  SearchBar.tsx           # Search, suggestions, geolocation
  SettingsPanel.tsx       # Theme & unit toggles
  ErrorMessage.tsx        # Global error banner
  LoadingState.tsx        # Loading skeleton/state
contexts/
  WeatherContext.tsx      # Global state, fetch flows, preferences
hooks/                    # (Reserved for custom hooks)
lib/
  weather-api.ts          # OpenWeather API wrapper
  weather-utils.ts        # Formatting & background gradients
types/
  weather.ts              # TypeScript models
```

## Environment & API

This app uses OpenWeather:
- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`
- Geo (Direct): `https://api.openweathermap.org/geo/1.0/direct`

The API key is exposed as `NEXT_PUBLIC_WEATHER_API_KEY` for client-side fetches. The code validates presence of a key and surfaces helpful error messages (401 invalid key, 429 rate limit, 404 city not found).

## Theming & UI

- Theme is persisted to localStorage and respects system preference on first load
- Background gradient adapts to weather condition (Clear, Clouds, Rain, Snow, etc.) and time-of-day (day/night)
- Light theme emphasizes legibility with soft pastel surfaces; dark theme uses glassmorphism with subtle contrast
- Cards and tiles use hover/focus styles and motion for a delightful feel

## Accessibility

- Keyboard navigable inputs & buttons
- Sufficient color contrast for text in both themes
- Reduced motion friendly: animations are subtle and non-blocking

## Error Handling

- Friendly, actionable messages (e.g., invalid key, city not found, throttling)
- Global dismissible error banner

## Production Build & Static Export

This project’s Next config is set to `output: 'export'` for static export compatibility.

To build and export:

```bash
npm run build
npx next export
```

This outputs to `out/`. You can serve it with any static server, for example:

```bash
npx serve out
```

If you prefer running a Node server, remove `output: 'export'` from `next.config.js`, then:

```bash
npm run build
npm run start
```

## Customization

- Update background palettes in `lib/weather-utils.ts` (`getWeatherGradient`) to tweak colors
- Tune UI surfaces and typography in components (e.g., WeatherCard/ForecastCard)
- Modify tabs/cards/button styles via Tailwind classes

## Troubleshooting

- Seeing demo or no data? Ensure `.env.local` is set and the dev server restarted
- Receiving 401/429 errors? Verify key activation, usage, and wait before retrying
- Search returns no cities? Try broader queries or click a suggestion (coordinates preferred)

## License

MIT <img width="1407" height="986" alt="image" src="https://github.com/user-attachments/assets/81a4e513-dee8-4291-a309-b01e854bfc5c" />


## Acknowledgements

- OpenWeather for APIs and icons
- Radix UI and lucide-react for accessible UI primitives and icons
- Tailwind CSS for utility-first styling
