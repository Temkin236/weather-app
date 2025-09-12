'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Thermometer, Palette, X } from 'lucide-react';
import { useState } from 'react';
import { useWeather } from '@/contexts/WeatherContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unit, setUnit, theme, setTheme } = useWeather();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/20 z-40"
        title="Settings"
      >
        <Settings size={18} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-white/95 backdrop-blur-md border-white/20 text-gray-900">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Settings</h2>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <X size={18} />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Temperature Unit */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Thermometer className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium">Temperature Unit</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => setUnit('metric')}
                          variant={unit === 'metric' ? 'default' : 'outline'}
                          size="sm"
                          className={cn(
                            unit === 'metric' && 'bg-blue-500 hover:bg-blue-600'
                          )}
                        >
                          Celsius (°C)
                        </Button>
                        <Button
                          onClick={() => setUnit('imperial')}
                          variant={unit === 'imperial' ? 'default' : 'outline'}
                          size="sm"
                          className={cn(
                            unit === 'imperial' && 'bg-blue-500 hover:bg-blue-600'
                          )}
                        >
                          Fahrenheit (°F)
                        </Button>
                      </div>
                    </div>

                    {/* Theme */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Palette className="w-5 h-5 text-purple-500" />
                        <h3 className="font-medium">Theme</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => setTheme('light')}
                          variant={theme === 'light' ? 'default' : 'outline'}
                          size="sm"
                          className={cn(
                            theme === 'light' && 'bg-purple-500 hover:bg-purple-600'
                          )}
                        >
                          Light
                        </Button>
                        <Button
                          onClick={() => setTheme('dark')}
                          variant={theme === 'dark' ? 'default' : 'outline'}
                          size="sm"
                          className={cn(
                            theme === 'dark' && 'bg-purple-500 hover:bg-purple-600'
                          )}
                        >
                          Dark
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      Weather data provided by OpenWeatherMap
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};