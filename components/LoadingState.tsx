'use client';

import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card } from '@/components/ui/card';

export const LoadingState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto mt-6"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <div className="p-8 text-center">
          <LoadingSpinner className="text-white mx-auto mb-4" size="lg" />
          <p className="text-white/80">Loading weather data...</p>
        </div>
      </Card>
    </motion.div>
  );
};