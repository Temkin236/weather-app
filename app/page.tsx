'use client';

import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { useWeather } from '@/contexts/WeatherContext';
import { SearchBar } from '@/components/SearchBar';
import { WeatherCard } from '@/components/WeatherCard';
import { ForecastCard } from '@/components/ForecastCard';
import { WeatherBackground } from '@/components/WeatherBackground';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingState } from '@/components/LoadingState';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const { currentWeather, forecast, loading } = useWeather();

  const goBack = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = window.location.pathname;
      }
    }
  };

  const WelcomeAnimation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <div className="flex justify-center gap-4 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="w-8 h-8 text-yellow-300" />
        </motion.div>
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <CloudRain className="w-8 h-8 text-blue-300" />
        </motion.div>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
        Weather App
      </h1>
      
      <p className="text-xl text-white/80 mb-2">
        Beautiful weather forecasts at your fingertips
      </p>
      
      <p className="text-white/60">
        Search for any city or use your current location
      </p>
    </motion.div>
  );

  return (
    <WeatherBackground>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <SettingsPanel />
        <Button
          onClick={goBack}
          className="fixed top-4 left-4 z-40 bg-white/80 dark:bg-white/10 text-slate-700 dark:text-white border-slate-200 dark:border-white/20 hover:bg-white shadow-md"
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex flex-col items-center justify-center min-h-screen">
          {!currentWeather && !loading && <WelcomeAnimation />}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <SearchBar />
          </motion.div>

          <ErrorMessage />
          
          {loading && <LoadingState />}
          
          {currentWeather && !loading && (
            <>
              <WeatherCard weather={currentWeather} />
              {forecast && <ForecastCard forecast={forecast} />}
            </>
          )}

          {!currentWeather && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 text-center text-white/60"
            >
              <p className="text-sm">
                Powered by OpenWeatherMap API
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </WeatherBackground>
  );
}