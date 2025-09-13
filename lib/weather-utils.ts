export const getWeatherGradient = (weatherMain: string, timeOfDay: 'day' | 'night' = 'day') => {
  const gradients = {
    day: {
      Clear: 'from-sky-300 via-sky-500 to-indigo-500',
      Clouds: 'from-slate-300 via-slate-400 to-slate-600',
      Rain: 'from-slate-600 via-blue-700 to-indigo-800',
      Drizzle: 'from-slate-500 via-sky-600 to-indigo-700',
      Thunderstorm: 'from-violet-700 via-purple-800 to-indigo-900',
      Snow: 'from-sky-100 via-sky-200 to-indigo-200',
      Mist: 'from-slate-200 via-slate-300 to-slate-400',
      Smoke: 'from-amber-200 via-orange-300 to-rose-300',
      Haze: 'from-amber-200 via-yellow-300 to-orange-300',
      Dust: 'from-amber-400 via-orange-400 to-rose-400',
      Fog: 'from-slate-200 via-slate-300 to-slate-400',
      Sand: 'from-amber-600 via-orange-500 to-rose-500',
      Ash: 'from-slate-600 via-slate-700 to-slate-800',
      Squall: 'from-sky-800 via-indigo-800 to-violet-800',
      Tornado: 'from-slate-900 via-violet-900 to-rose-900',
    },
    night: {
      Clear: 'from-indigo-950 via-purple-900 to-sky-900',
      Clouds: 'from-slate-800 via-slate-900 to-black',
      Rain: 'from-slate-900 via-blue-900 to-indigo-900',
      Drizzle: 'from-slate-800 via-sky-800 to-indigo-800',
      Thunderstorm: 'from-violet-900 via-indigo-900 to-slate-900',
      Snow: 'from-sky-900 via-indigo-900 to-violet-900',
      Mist: 'from-slate-700 via-slate-800 to-slate-900',
      Smoke: 'from-amber-900 via-rose-900 to-slate-900',
      Haze: 'from-amber-900 via-orange-900 to-rose-900',
      Dust: 'from-amber-800 via-orange-800 to-rose-800',
      Fog: 'from-slate-700 via-slate-800 to-slate-900',
      Sand: 'from-amber-800 via-orange-800 to-rose-800',
      Ash: 'from-slate-700 via-slate-800 to-slate-900',
      Squall: 'from-sky-900 via-indigo-900 to-violet-900',
      Tornado: 'from-slate-900 via-rose-900 to-black',
    }
  };

  return gradients[timeOfDay][weatherMain as keyof typeof gradients.day] || gradients[timeOfDay].Clear;
};

export const formatTemperature = (temp: number, unit: 'metric' | 'imperial') => {
  return `${Math.round(temp)}°${unit === 'metric' ? 'C' : 'F'}`;
};

export const formatWindSpeed = (speed: number, unit: 'metric' | 'imperial') => {
  return `${Math.round(speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`;
};

export const formatTime = (timestamp: number, timezone: number) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getWeatherDescription = (weather: any) => {
  return weather[0]?.description?.replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Unknown';
};

export const isDay = (current: number, sunrise: number, sunset: number) => {
  return current >= sunrise && current <= sunset;
};

export const getAirQualityText = (aqi: number) => {
  if (aqi <= 50) return { text: 'Good', color: 'text-green-500' };
  if (aqi <= 100) return { text: 'Moderate', color: 'text-yellow-500' };
  if (aqi <= 150) return { text: 'Unhealthy for Sensitive', color: 'text-orange-500' };
  if (aqi <= 200) return { text: 'Unhealthy', color: 'text-red-500' };
  if (aqi <= 300) return { text: 'Very Unhealthy', color: 'text-purple-500' };
  return { text: 'Hazardous', color: 'text-red-900' };
};

export const getUVIndexText = (uvi: number) => {
  if (uvi <= 2) return { text: 'Low', color: 'text-green-500' };
  if (uvi <= 5) return { text: 'Moderate', color: 'text-yellow-500' };
  if (uvi <= 7) return { text: 'High', color: 'text-orange-500' };
  if (uvi <= 10) return { text: 'Very High', color: 'text-red-500' };
  return { text: 'Extreme', color: 'text-purple-500' };
};