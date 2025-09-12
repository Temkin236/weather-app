'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '@/contexts/WeatherContext';
import { getWeatherGradient, isDay } from '@/lib/weather-utils';
import { cn } from '@/lib/utils';

interface WeatherBackgroundProps {
  children: ReactNode;
}

export const WeatherBackground = ({ children }: WeatherBackgroundProps) => {
  const { currentWeather, theme } = useWeather();

  const getGradient = () => {
    if (!currentWeather) {
      return theme === 'dark' 
        ? 'from-slate-900 via-purple-900 to-slate-900'
        : 'from-blue-400 via-blue-500 to-blue-600';
    }

    const timeOfDay = isDay(
      currentWeather.dt,
      currentWeather.sys.sunrise,
      currentWeather.sys.sunset
    ) ? 'day' : 'night';

    return getWeatherGradient(currentWeather.weather[0].main, timeOfDay);
  };

  const getWeatherParticles = () => {
    if (!currentWeather) return null;

    const weatherMain = currentWeather.weather[0].main.toLowerCase();

    if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-8 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
              animate={{
                y: ['0vh', '100vh']
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      );
    }

    if (weatherMain.includes('snow')) {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      className={cn(
        "min-h-screen bg-gradient-to-br transition-all duration-1000",
        getGradient()
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {getWeatherParticles()}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};