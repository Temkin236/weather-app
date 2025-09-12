'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, X } from 'lucide-react';
import { useWeather } from '@/contexts/WeatherContext';
import { WeatherAPI } from '@/lib/weather-api';
import { LocationData } from '@/types/weather';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { fetchWeatherByCity, fetchWeatherByCoords, recentSearches, loading } = useWeather();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCities = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await WeatherAPI.searchCities(query);
        setSuggestions(results);
      } catch (error) {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    fetchWeatherByCity(searchQuery);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: LocationData) => {
    // Prefer fetching by coordinates for accuracy and to avoid "city not found" issues
    fetchWeatherByCoords(suggestion.lat, suggestion.lon);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please search for a city instead.');
      }
    );
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            disabled={loading}
          />
          {query && (
            <button
              onClick={clearQuery}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button
          onClick={() => handleSearch(query)}
          disabled={loading || !query.trim()}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          size="icon"
        >
          <Search size={18} />
        </Button>
        <Button
          onClick={getCurrentLocation}
          disabled={loading}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          size="icon"
          title="Use current location"
        >
          <MapPin size={18} />
        </Button>
      </div>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 max-h-80 overflow-y-auto z-50"
        >
          {isSearching && (
            <div className="p-4 text-center text-gray-600">
              <div className="inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                Searching...
              </div>
            </div>
          )}

          {!isSearching && suggestions.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  <MapPin size={16} className="text-gray-400" />
                  <div>
                    <div className="text-gray-900 font-medium">
                      {suggestion.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!isSearching && query.length < 2 && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-900">{search}</span>
                </button>
              ))}
            </div>
          )}

          {!isSearching && query.length >= 2 && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No cities found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};