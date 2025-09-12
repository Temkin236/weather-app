export const getWeatherGradient = (weatherMain: string, timeOfDay: 'day' | 'night' = 'day') => {
  const gradients = {
    day: {
      Clear: 'from-blue-400 via-blue-500 to-blue-600',
      Clouds: 'from-gray-400 via-gray-500 to-gray-600',
      Rain: 'from-gray-600 via-blue-700 to-indigo-800',
      Drizzle: 'from-gray-500 via-blue-600 to-indigo-700',
      Thunderstorm: 'from-purple-900 via-purple-800 to-indigo-900',
      Snow: 'from-blue-100 via-blue-200 to-blue-300',
      Mist: 'from-gray-300 via-gray-400 to-gray-500',
      Smoke: 'from-orange-200 via-orange-300 to-orange-400',
      Haze: 'from-yellow-200 via-yellow-300 to-orange-300',
      Dust: 'from-yellow-400 via-orange-400 to-red-400',
      Fog: 'from-gray-200 via-gray-300 to-gray-400',
      Sand: 'from-yellow-600 via-orange-500 to-red-500',
      Ash: 'from-gray-600 via-gray-700 to-gray-800',
      Squall: 'from-blue-800 via-indigo-800 to-purple-800',
      Tornado: 'from-gray-900 via-purple-900 to-red-900',
    },
    night: {
      Clear: 'from-indigo-900 via-purple-900 to-blue-900',
      Clouds: 'from-gray-800 via-gray-900 to-black',
      Rain: 'from-gray-900 via-blue-900 to-indigo-900',
      Drizzle: 'from-gray-800 via-blue-800 to-indigo-800',
      Thunderstorm: 'from-purple-900 via-indigo-900 to-gray-900',
      Snow: 'from-blue-900 via-indigo-900 to-purple-900',
      Mist: 'from-gray-700 via-gray-800 to-gray-900',
      Smoke: 'from-orange-900 via-red-900 to-gray-900',
      Haze: 'from-yellow-900 via-orange-900 to-red-900',
      Dust: 'from-yellow-800 via-orange-800 to-red-800',
      Fog: 'from-gray-600 via-gray-700 to-gray-800',
      Sand: 'from-yellow-800 via-orange-800 to-red-800',
      Ash: 'from-gray-700 via-gray-800 to-gray-900',
      Squall: 'from-blue-900 via-indigo-900 to-purple-900',
      Tornado: 'from-gray-900 via-red-900 to-black',
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