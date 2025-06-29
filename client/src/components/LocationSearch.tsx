import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

interface LocationSearchProps {
  onLocationChange: (location: string) => void;
  currentLocation: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationChange, currentLocation }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularLocations = [
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bangalore, Karnataka',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Pune, Maharashtra',
    'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan',
    'Lucknow, Uttar Pradesh'
  ];

  const handleLocationSearch = (query: string) => {
    if (query.length > 2) {
      const filtered = popularLocations.filter(location =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const getCurrentLocation = () => {
    setIsSearching(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          // For demo, we'll use a mock location
          const mockLocation = 'Mumbai, Maharashtra';
          onLocationChange(mockLocation);
          setIsSearching(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsSearching(false);
        }
      );
    } else {
      setIsSearching(false);
    }
  };

  const selectLocation = (location: string) => {
    onLocationChange(location);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Enter your delivery location"
            value={currentLocation}
            onChange={(e) => {
              onLocationChange(e.target.value);
              handleLocationSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={getCurrentLocation}
          disabled={isSearching}
          className="flex items-center space-x-2 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {isSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          <span className="hidden md:block">Use Current Location</span>
        </button>
      </div>

      {/* Location Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => selectLocation(location)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{location}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Popular Locations */}
      {currentLocation === '' && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Popular locations:</p>
          <div className="flex flex-wrap gap-2">
            {popularLocations.slice(0, 6).map((location, index) => (
              <button
                key={index}
                onClick={() => selectLocation(location)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {location.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;