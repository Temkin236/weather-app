'use client';

import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  Cloud,
  Umbrella
} from 'lucide-react';
import { WeatherData } from '@/types/weather';
import { useWeather } from '@/contexts/WeatherContext';
import { 
  formatTemperature, 
  formatWindSpeed, 
  formatTime, 
  getWeatherDescription,
  isDay
} from '@/lib/weather-utils';
import { WeatherAPI } from '@/lib/weather-api';
import { Card } from '@/components/ui/card';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { unit } = useWeather();
  const isDaytime = isDay(weather.dt, weather.sys.sunrise, weather.sys.sunset);

  const weatherStats = [
    {
      icon: Thermometer,
      label: 'Feels like',
      value: formatTemperature(weather.main.feels_like, unit),
      color: 'text-orange-400'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      color: 'text-blue-400'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: formatWindSpeed(weather.wind.speed, unit),
      color: 'text-green-400'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: 'text-purple-400'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      color: 'text-yellow-400'
    },
    {
      icon: Cloud,
      label: 'Cloudiness',
      value: `${weather.clouds.all}%`,
      color: 'text-gray-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden">
        <div className="p-6">
          {/* Main Weather Info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1">{weather.name}</h2>
              <p className="text-white/80">{weather.sys.country}</p>
              <p className="text-white/60 text-sm mt-1">
                {getWeatherDescription(weather.weather)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <img
                  src={WeatherAPI.getWeatherIcon(weather.weather[0].icon, 'large')}
                  alt={weather.weather[0].description}
                  className="w-20 h-20"
                />
                <div className="text-5xl font-bold">
                  {formatTemperature(weather.main.temp, unit)}
                </div>
              </div>
              <div className="text-sm text-white/70 mt-2">
                H: {formatTemperature(weather.main.temp_max, unit)} / 
                L: {formatTemperature(weather.main.temp_min, unit)}
              </div>
            </div>
          </div>

          {/* Weather Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {weatherStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-white font-semibold">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sun Times */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <Sunrise className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide">
                    Sunrise
                  </p>
                  <p className="text-white font-semibold">
                    {formatTime(weather.sys.sunrise, weather.timezone)}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <Sunset className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide">
                    Sunset
                  </p>
                  <p className="text-white font-semibold">
                    {formatTime(weather.sys.sunset, weather.timezone)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Weather Info */}
          {(weather.rain || weather.snow) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 bg-white/5 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <Umbrella className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide">
                    Precipitation
                  </p>
                  <p className="text-white font-semibold">
                    {weather.rain?.['1h'] && `${weather.rain['1h']}mm rain (1h)`}
                    {weather.rain?.['3h'] && `${weather.rain['3h']}mm rain (3h)`}
                    {weather.snow?.['1h'] && `${weather.snow['1h']}mm snow (1h)`}
                    {weather.snow?.['3h'] && `${weather.snow['3h']}mm snow (3h)`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};