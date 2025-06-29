import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin, ChevronDown } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  minOrder: number;
  deliveryFee: number;
  featured: boolean;
  isOpen: boolean;
  location: string;
}

const Restaurants: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const restaurants: Restaurant[] = [
    // Indian Restaurants
    {
      id: '1',
      name: 'Spice Garden',
      cuisine: 'Indian',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 200,
      deliveryFee: 40,
      featured: true,
      isOpen: true,
      location: 'Mumbai, Maharashtra'
    },
    {
      id: '2',
      name: 'Maharaja Palace',
      cuisine: 'Indian',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '2.1 km',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 250,
      deliveryFee: 50,
      featured: true,
      isOpen: true,
      location: 'Delhi, Delhi'
    },
    {
      id: '3',
      name: 'Tandoor Express',
      cuisine: 'Indian',
      rating: 4.7,
      deliveryTime: '20-30 min',
      distance: '1.8 km',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 180,
      deliveryFee: 35,
      featured: true,
      isOpen: true,
      location: 'Bangalore, Karnataka'
    },
    {
      id: '4',
      name: 'Biryani House',
      cuisine: 'Indian',
      rating: 4.6,
      deliveryTime: '35-45 min',
      distance: '2.5 km',
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 220,
      deliveryFee: 45,
      featured: false,
      isOpen: true,
      location: 'Hyderabad, Telangana'
    },
    {
      id: '5',
      name: 'South Indian Delights',
      cuisine: 'Indian',
      rating: 4.5,
      deliveryTime: '25-35 min',
      distance: '1.9 km',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 150,
      deliveryFee: 30,
      featured: false,
      isOpen: true,
      location: 'Chennai, Tamil Nadu'
    },
    {
      id: '6',
      name: 'Punjabi Dhaba',
      cuisine: 'Indian',
      rating: 4.4,
      deliveryTime: '30-40 min',
      distance: '2.3 km',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 200,
      deliveryFee: 40,
      featured: false,
      isOpen: true,
      location: 'Pune, Maharashtra'
    },
    // International Restaurants
    {
      id: '7',
      name: 'Burger Palace',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-30 min',
      distance: '2.1 km',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 150,
      deliveryFee: 30,
      featured: true,
      isOpen: true,
      location: 'Mumbai, Maharashtra'
    },
    {
      id: '8',
      name: 'Pizza Corner',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '25-35 min',
      distance: '1.8 km',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 120,
      deliveryFee: 25,
      featured: true,
      isOpen: true,
      location: 'Delhi, Delhi'
    },
    {
      id: '9',
      name: 'Dragon Chinese',
      cuisine: 'Chinese',
      rating: 4.3,
      deliveryTime: '20-30 min',
      distance: '1.9 km',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 140,
      deliveryFee: 35,
      featured: false,
      isOpen: true,
      location: 'Bangalore, Karnataka'
    },
    {
      id: '10',
      name: 'Thai Garden',
      cuisine: 'Thai',
      rating: 4.4,
      deliveryTime: '25-35 min',
      distance: '2.8 km',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
      minOrder: 180,
      deliveryFee: 40,
      featured: false,
      isOpen: false,
      location: 'Chennai, Tamil Nadu'
    }
  ];

  const cuisines = ['All', 'Indian', 'American', 'Italian', 'Chinese', 'Thai', 'Japanese', 'Mexican', 'Mediterranean'];
  const locations = ['All Locations', 'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Pune, Maharashtra'];

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = selectedCuisine === '' || selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
      const matchesLocation = selectedLocation === '' || selectedLocation === 'All Locations' || restaurant.location === selectedLocation;
      return matchesSearch && matchesCuisine && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'deliveryFee':
          return a.deliveryFee - b.deliveryFee;
        default:
          return 0;
      }
    });

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCuisine(searchParams.get('category') || '');
    setSelectedLocation(searchParams.get('location') || '');
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Restaurants Near You
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing food from local restaurants, featuring authentic Indian cuisine and international favorites
          </p>
          {selectedLocation && (
            <p className="text-primary-600 font-medium mt-2">
              📍 Showing restaurants in: {selectedLocation}
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location === 'All Locations' ? '' : location}>
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Cuisine Filter */}
            <div className="relative">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="deliveryTime">Sort by Delivery Time</option>
                <option value="distance">Sort by Distance</option>
                <option value="deliveryFee">Sort by Delivery Fee</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
            {selectedLocation && ` in ${selectedLocation}`}
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                !restaurant.isOpen ? 'opacity-75' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {restaurant.featured && (
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
                {!restaurant.isOpen && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Currently Closed</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 mb-2">{restaurant.cuisine} Cuisine</p>
                <p className="text-sm text-gray-500 mb-4">📍 {restaurant.location}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Min. order: ₹{restaurant.minOrder}
                  </span>
                  <span className="text-gray-600">
                    Delivery: ₹{restaurant.deliveryFee}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search, location, or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;