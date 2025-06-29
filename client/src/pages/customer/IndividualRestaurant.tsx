import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  veg: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
}

const IndividualRestaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Enhanced restaurant data with Indian restaurants
  const getRestaurantData = (restaurantId: string) => {
    const restaurants = {
      '1': {
        id: '1',
        name: 'Spice Garden',
        cuisine: 'Indian',
        rating: 4.8,
        reviews: 2340,
        deliveryTime: '25-35 min',
        distance: '1.2 km',
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
        minOrder: 200,
        deliveryFee: 40,
        description: 'Authentic Indian cuisine with traditional spices and flavors. Experience the rich heritage of Indian cooking with our carefully crafted dishes.',
        address: 'Shop 15, Food Street, Bandra West, Mumbai',
        phone: '+91 98765 43210',
        isOpen: true,
        openingHours: 'Mon-Sun: 11:00 AM - 11:00 PM'
      },
      '2': {
        id: '2',
        name: 'Maharaja Palace',
        cuisine: 'Indian',
        rating: 4.9,
        reviews: 1890,
        deliveryTime: '30-40 min',
        distance: '2.1 km',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
        minOrder: 250,
        deliveryFee: 50,
        description: 'Royal Indian dining experience with premium ingredients and traditional recipes passed down through generations.',
        address: 'Block A, Connaught Place, New Delhi',
        phone: '+91 98765 43211',
        isOpen: true,
        openingHours: 'Mon-Sun: 12:00 PM - 12:00 AM'
      },
      '3': {
        id: '3',
        name: 'Tandoor Express',
        cuisine: 'Indian',
        rating: 4.7,
        reviews: 1560,
        deliveryTime: '20-30 min',
        distance: '1.8 km',
        image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
        minOrder: 180,
        deliveryFee: 35,
        description: 'Fast and fresh Indian food with authentic tandoor preparations and quick service.',
        address: '123 MG Road, Bangalore',
        phone: '+91 98765 43212',
        isOpen: true,
        openingHours: 'Mon-Sun: 10:00 AM - 11:30 PM'
      }
    };

    return restaurants[restaurantId as keyof typeof restaurants] || restaurants['1'];
  };

  const restaurant = getRestaurantData(id || '1');

  // Enhanced menu items with Indian dishes
  const getMenuItems = (restaurantId: string): MenuItem[] => {
    const indianMenus = {
      '1': [ // Spice Garden
        {
          id: '1',
          name: 'Butter Chicken',
          description: 'Tender chicken in rich tomato and butter gravy with aromatic spices',
          price: 320,
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Main Course',
          popular: true,
          veg: false,
          spiceLevel: 'Medium'
        },
        {
          id: '2',
          name: 'Paneer Tikka Masala',
          description: 'Grilled cottage cheese in creamy tomato-based curry',
          price: 280,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Main Course',
          popular: true,
          veg: true,
          spiceLevel: 'Medium'
        },
        {
          id: '3',
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice with spiced chicken, served with raita and shorba',
          price: 350,
          image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Rice & Biryani',
          popular: true,
          veg: false,
          spiceLevel: 'Medium'
        },
        {
          id: '4',
          name: 'Garlic Naan',
          description: 'Fresh baked bread with garlic and herbs',
          price: 80,
          image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Breads',
          popular: true,
          veg: true
        },
        {
          id: '5',
          name: 'Dal Makhani',
          description: 'Creamy black lentils slow-cooked with butter and spices',
          price: 220,
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Main Course',
          popular: false,
          veg: true,
          spiceLevel: 'Mild'
        },
        {
          id: '6',
          name: 'Masala Chai',
          description: 'Traditional Indian spiced tea with milk',
          price: 40,
          image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Beverages',
          popular: true,
          veg: true
        },
        {
          id: '7',
          name: 'Gulab Jamun',
          description: 'Sweet milk dumplings in sugar syrup',
          price: 120,
          image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Desserts',
          popular: false,
          veg: true
        },
        {
          id: '8',
          name: 'Tandoori Chicken',
          description: 'Marinated chicken grilled in traditional tandoor oven',
          price: 380,
          image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Tandoor',
          popular: true,
          veg: false,
          spiceLevel: 'Hot'
        }
      ],
      '2': [ // Maharaja Palace
        {
          id: '9',
          name: 'Mutton Rogan Josh',
          description: 'Kashmiri delicacy with tender mutton in aromatic gravy',
          price: 450,
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Main Course',
          popular: true,
          veg: false,
          spiceLevel: 'Medium'
        },
        {
          id: '10',
          name: 'Hyderabadi Biryani',
          description: 'Royal biryani with basmati rice, mutton, and saffron',
          price: 420,
          image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Rice & Biryani',
          popular: true,
          veg: false,
          spiceLevel: 'Medium'
        },
        {
          id: '11',
          name: 'Palak Paneer',
          description: 'Cottage cheese in creamy spinach gravy',
          price: 260,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Main Course',
          popular: false,
          veg: true,
          spiceLevel: 'Mild'
        },
        {
          id: '12',
          name: 'Kulfi Falooda',
          description: 'Traditional Indian ice cream with vermicelli and rose syrup',
          price: 150,
          image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Desserts',
          popular: true,
          veg: true
        }
      ]
    };

    return indianMenus[restaurantId as keyof typeof indianMenus] || indianMenus['1'];
  };

  const menuItems = getMenuItems(id || '1');
  const categories = ['All', 'Main Course', 'Rice & Biryani', 'Tandoor', 'Breads', 'Beverages', 'Desserts'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);
  
  const popularItems = menuItems.filter(item => item.popular);

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name
      });
    }
    toast.success(`${item.name} added to cart!`);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  const getSpiceLevelColor = (level?: string) => {
    switch (level) {
      case 'Mild': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hot': return 'bg-orange-100 text-orange-800';
      case 'Extra Hot': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg mb-2">{restaurant.cuisine} Cuisine</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
              </div>
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Restaurant Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Restaurant Info</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{restaurant.phone}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Hours:</span>
                  <p className="text-gray-600">{restaurant.openingHours}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Min. Order:</span>
                  <p className="text-gray-600">₹{restaurant.minOrder}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Delivery Fee:</span>
                  <p className="text-gray-600">₹{restaurant.deliveryFee}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Favorite</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="lg:col-span-3">
            {/* Restaurant Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About {restaurant.name}</h2>
              <p className="text-gray-600">{restaurant.description}</p>
            </div>

            {/* Popular Items */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Popular Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        {item.veg && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Veg
                          </span>
                        )}
                        {item.spiceLevel && (
                          <span className={`text-xs px-2 py-1 rounded-full ${getSpiceLevelColor(item.spiceLevel)}`}>
                            {item.spiceLevel}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.description.substring(0, 50)}...</p>
                      <p className="text-lg font-bold text-primary-600">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                        {item.popular && (
                          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                        {item.veg && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Veg
                          </span>
                        )}
                        {item.spiceLevel && (
                          <span className={`text-xs px-2 py-1 rounded-full ${getSpiceLevelColor(item.spiceLevel)}`}>
                            🌶️ {item.spiceLevel}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <p className="text-2xl font-bold text-primary-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          disabled={!quantities[item.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {quantities[item.id] || 0}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualRestaurant;