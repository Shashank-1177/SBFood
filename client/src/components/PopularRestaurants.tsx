import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  featured: boolean;
}

const PopularRestaurants: React.FC = () => {
  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Spice Garden',
      cuisine: 'Indian',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: '2',
      name: 'Maharaja Palace',
      cuisine: 'Indian',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '2.1 km',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: '3',
      name: 'Tandoor Express',
      cuisine: 'Indian',
      rating: 4.7,
      deliveryTime: '20-30 min',
      distance: '1.8 km',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: '4',
      name: 'Burger Palace',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-30 min',
      distance: '2.1 km',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: '5',
      name: 'Pizza Corner',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '25-35 min',
      distance: '1.8 km',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: '6',
      name: 'Sushi Zen',
      cuisine: 'Japanese',
      rating: 4.8,
      deliveryTime: '30-40 min',
      distance: '3.2 km',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Restaurants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most loved restaurants in your area, featuring authentic Indian cuisine 
            and international favorites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 mb-4">{restaurant.cuisine} Cuisine</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/restaurants"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
          >
            View All Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;