'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, ForecastData, WeatherContextType } from '@/types/weather';
import { WeatherAPI } from '@/lib/weather-api';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load saved preferences on mount
  useEffect(() => {
    const savedUnit = localStorage.getItem('weather-unit') as 'metric' | 'imperial';
    const savedTheme = localStorage.getItem('weather-theme') as 'light' | 'dark';
    const savedSearches = JSON.parse(localStorage.getItem('weather-recent-searches') || '[]');

    if (savedUnit) setUnit(savedUnit);
    if (savedTheme) setTheme(savedTheme);
    if (savedSearches) setRecentSearches(savedSearches);

    // Detect system theme preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Try to get user's location on initial load
    getCurrentLocationWeather();
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('weather-unit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('weather-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('weather-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const getCurrentLocationWeather = async () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        } catch (err) {
          console.log('Could not fetch location weather:', err);
        }
      },
      (err) => {
        console.log('Geolocation error:', err);
      }
    );
  };

  const fetchWeatherByCity = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherAPI.getCurrentWeather(city, unit),
        WeatherAPI.getForecast(city, unit)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);

      // Add to recent searches
      const updatedSearches = [city, ...recentSearches.filter(s => s.toLowerCase() !== city.toLowerCase())].slice(0, 5);
      setRecentSearches(updatedSearches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherAPI.getCurrentWeatherByCoords(lat, lon, unit),
        WeatherAPI.getForecastByCoords(lat, lon, unit)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: WeatherContextType = {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    theme,
    recentSearches,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    setUnit,
    setTheme,
    clearError
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};