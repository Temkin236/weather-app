const API_KEY = (process.env.NEXT_PUBLIC_WEATHER_API_KEY || '').trim();
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

const ensureApiKey = () => {
  if (!API_KEY) {
    throw new Error('Missing OpenWeather API key. Set NEXT_PUBLIC_WEATHER_API_KEY in .env.local and restart the dev server.');
  }
};

export class WeatherAPI {
  static async getCurrentWeather(city: string, units: 'metric' | 'imperial' = 'metric') {
    ensureApiKey();

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      let details = '';
      try {
        const data = await response.json();
        if (data?.message) details = ` (${data.message})`;
      } catch {}

      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.' + details);
      }
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or missing OpenWeather API key.' + details);
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.' + details);
      }
      throw new Error('Failed to fetch weather data.' + details);
    }

    return response.json();
  }

  static async getCurrentWeatherByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric') {
    ensureApiKey();

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      let details = '';
      try {
        const data = await response.json();
        if (data?.message) details = ` (${data.message})`;
      } catch {}

      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or missing OpenWeather API key.' + details);
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.' + details);
      }
      throw new Error('Failed to fetch weather data for your location.' + details);
    }

    return response.json();
  }

  static async getForecast(city: string, units: 'metric' | 'imperial' = 'metric') {
    ensureApiKey();

    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      let details = '';
      try {
        const data = await response.json();
        if (data?.message) details = ` (${data.message})`;
      } catch {}

      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or missing OpenWeather API key.' + details);
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.' + details);
      }
      throw new Error('Failed to fetch forecast data.' + details);
    }

    return response.json();
  }

  static async getForecastByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric') {
    ensureApiKey();

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      let details = '';
      try {
        const data = await response.json();
        if (data?.message) details = ` (${data.message})`;
      } catch {}

      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or missing OpenWeather API key.' + details);
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.' + details);
      }
      throw new Error('Failed to fetch forecast data.' + details);
    }

    return response.json();
  }

  static async searchCities(query: string, limit: number = 5) {
    if (query.length < 2) return [];

    ensureApiKey();

    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`
    );

    if (!response.ok) {
      // Swallow errors here to avoid noisy UI, but try to parse message for debugging
      try {
        const data = await response.json();
        console.warn('City search failed:', data);
      } catch {}
      return [];
    }

    return response.json();
  }

  static getWeatherIcon(iconCode: string, size: 'small' | 'medium' | 'large' = 'medium') {
    const sizeMap = {
      small: '',
      medium: '@2x',
      large: '@4x'
    };
    return `https://openweathermap.org/img/wn/${iconCode}${sizeMap[size]}.png`;
  }
}