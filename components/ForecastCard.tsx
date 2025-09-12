'use client';

import { motion } from 'framer-motion';
import { ForecastData } from '@/types/weather';
import { useWeather } from '@/contexts/WeatherContext';
import { formatTemperature, formatDate, getWeatherDescription } from '@/lib/weather-utils';
import { WeatherAPI } from '@/lib/weather-api';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ForecastCardProps {
  forecast: ForecastData;
}

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const { unit } = useWeather();

  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecast.list>);

  const dailyData = Object.entries(dailyForecasts).slice(0, 5).map(([date, items]) => {
    const temps = items.map(item => item.main.temp);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const midDayWeather = items.find(item => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 12 && hour <= 15;
    }) || items[0];

    return {
      date,
      timestamp: items[0].dt,
      maxTemp,
      minTemp,
      weather: midDayWeather.weather[0],
      items
    };
  });

  const hourlyData = forecast.list.slice(0, 24);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mt-6"
    >
      <Card className="bg-white text-slate-900 border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/20 backdrop-blur-md">
        <div className="p-6">
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 border-slate-200 text-slate-600 dark:bg-white/10 dark:border-white/20 dark:text-white/70">
              <TabsTrigger 
                value="daily" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-600 dark:data-[state=active]:bg-white/20 dark:data-[state=active]:text-white dark:text-white/70"
              >
                5-Day Forecast
              </TabsTrigger>
              <TabsTrigger 
                value="hourly"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-600 dark:data-[state=active]:bg-white/20 dark:data-[state=active]:text-white dark:text-white/70"
              >
                24-Hour Forecast
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="mt-6">
              <div className="space-y-3">
                {dailyData.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-slate-50 dark:bg-white/5 rounded-lg p-4 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold">
                          {index === 0 ? 'Today' : formatDate(day.timestamp)}
                        </p>
                        <p className="text-slate-500 dark:text-white/60 text-sm">
                          {getWeatherDescription([day.weather])}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={WeatherAPI.getWeatherIcon(day.weather.icon)}
                        alt={day.weather.description}
                        className="w-12 h-12"
                      />
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatTemperature(day.maxTemp, unit)}
                        </p>
                        <p className="text-slate-500 dark:text-white/60 text-sm">
                          {formatTemperature(day.minTemp, unit)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hourly" className="mt-6">
              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4 min-w-max">
                  {hourlyData.map((hour, index) => (
                    <motion.div
                      key={hour.dt}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col items-center bg-slate-50 dark:bg-white/5 rounded-lg p-3 backdrop-blur-sm min-w-[80px] hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <p className="text-xs text-slate-500 dark:text-white/60 mb-2">
                        {new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          hour12: true
                        })}
                      </p>
                      <img
                        src={WeatherAPI.getWeatherIcon(hour.weather[0].icon)}
                        alt={hour.weather[0].description}
                        className="w-8 h-8 mb-2"
                      />
                      <p className="font-semibold text-sm">
                        {formatTemperature(hour.main.temp, unit)}
                      </p>
                      {hour.pop > 0.1 && (
                        <p className="text-xs text-blue-300 mt-1">
                          {Math.round(hour.pop * 100)}%
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </motion.div>
  );
};