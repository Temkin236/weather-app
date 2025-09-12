import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WeatherProvider } from '@/contexts/WeatherContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather App - Beautiful Weather Forecasts',
  description: 'Get beautiful, detailed weather forecasts with current conditions, 5-day forecasts, and more.',
  keywords: ['weather', 'forecast', 'temperature', 'climate', 'meteorology'],
  authors: [{ name: 'Weather App' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WeatherProvider>
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
}