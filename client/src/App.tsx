import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Restaurants from './pages/Restaurants';
import IndividualRestaurant from './pages/customer/IndividualRestaurant';
import Cart from './pages/customer/Cart';
import OrderConfirmation from './pages/customer/OrderConfirmation';
import Profile from './pages/customer/Profile';
import Admin from './pages/admin/Admin';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Authentication mode="login" />} />
                <Route path="/register" element={<Authentication mode="register" />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/restaurant/:id" element={<IndividualRestaurant />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
                <Route path="/orders" element={<Profile />} />
                <Route path="/settings" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#059669',
                  },
                },
                error: {
                  style: {
                    background: '#DC2626',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;