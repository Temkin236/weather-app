'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import { useWeather } from '@/contexts/WeatherContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ErrorMessage = () => {
  const { error, clearError } = useWeather();

  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto mt-6"
    >
      <Card className="bg-red-500/10 border-red-500/20 text-white">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-200 mb-1">
                Something went wrong
              </h3>
              <p className="text-red-100 text-sm">
                {error}
              </p>
            </div>
            <Button
              onClick={clearError}
              variant="ghost"
              size="sm"
              className="text-red-200 hover:text-white hover:bg-red-500/20 -mt-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="text-red-200 border-red-400/30 hover:bg-red-500/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};