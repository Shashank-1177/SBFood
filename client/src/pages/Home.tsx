import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Star, ChefHat, Truck, Shield } from 'lucide-react';
import PopularRestaurants from '../components/PopularRestaurants';
import LocationSearch from '../components/LocationSearch';

const Home: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCategories = [
    {
      id: 1,
      name: 'Pizza',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300',
      count: '25+ restaurants'
    },
    {
      id: 2,
      name: 'Burgers',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300',
      count: '18+ restaurants'
    },
    {
      id: 3,
      name: 'Indian',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300',
      count: '30+ restaurants'
    },
    {
      id: 4,
      name: 'Chinese',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=300',
      count: '22+ restaurants'
    },
    {
      id: 5,
      name: 'Mexican',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300',
      count: '15+ restaurants'
    },
    {
      id: 6,
      name: 'Thai',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300',
      count: '12+ restaurants'
    }
  ];

  const features = [
    {
      icon: <ChefHat className="h-8 w-8 text-primary-500" />,
      title: 'Quality Food',
      description: 'Fresh ingredients and top-rated restaurants ensure every meal is exceptional.'
    },
    {
      icon: <Truck className="h-8 w-8 text-primary-500" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service gets your food to you while it\'s still hot.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: 'Safe & Secure',
      description: 'Secure payment processing and contactless delivery for your peace of mind.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food,
              <br />
              <span className="text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your favorite meals from the best restaurants, delivered hot and fresh to your doorstep.
            </p>
            
            {/* Enhanced Search Bar with Location */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Location Search */}
                <div className="flex-1 w-full">
                  <LocationSearch 
                    onLocationChange={setSearchLocation}
                    currentLocation={searchLocation}
                  />
                </div>
                
                {/* Food Search */}
                <div className="flex-1 w-full flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for restaurants or dishes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                
                <Link
                  to={`/restaurants?location=${encodeURIComponent(searchLocation)}&search=${encodeURIComponent(searchQuery)}`}
                  className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold whitespace-nowrap"
                >
                  Find Food
                </Link>
              </div>
            </div>

            {/* Quick Location Access */}
            {searchLocation && (
              <div className="mt-4 text-center">
                <p className="text-lg">
                  🍽️ Delivering to: <span className="font-semibold">{searchLocation}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Explore your favorite cuisines from top-rated restaurants
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/restaurants?category=${category.name.toLowerCase()}&location=${encodeURIComponent(searchLocation)}`}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <PopularRestaurants />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SB Foods?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to providing the best food delivery experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SB Foods for their daily meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-500 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;