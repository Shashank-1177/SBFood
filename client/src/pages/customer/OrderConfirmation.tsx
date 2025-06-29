import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone, Mail, Package, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variants?: Array<{
    name: string;
    option: string;
    priceModifier: number;
  }>;
  specialInstructions?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  restaurant: {
    name: string;
    cuisine: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
  payment: {
    method: string;
    status: string;
  };
  status: string;
  estimatedDeliveryTime: string;
  createdAt: string;
  canCancel: boolean;
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        // Get user-specific orders from localStorage
        const userOrders = JSON.parse(localStorage.getItem(`user_orders_${user.id}`) || '[]');
        const foundOrder = userOrders.find((order: Order) => order.id === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user?.id]);

  const handleCancelOrder = async () => {
    if (!order || !user?.id) return;

    setCancelling(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update order status in localStorage
      const userOrders = JSON.parse(localStorage.getItem(`user_orders_${user.id}`) || '[]');
      const updatedOrders = userOrders.map((o: Order) => 
        o.id === order.id 
          ? { ...o, status: 'cancelled', canCancel: false }
          : o
      );
      localStorage.setItem(`user_orders_${user.id}`, JSON.stringify(updatedOrders));

      // Update local state
      setOrder(prev => prev ? { ...prev, status: 'cancelled', canCancel: false } : null);
      
      toast.success('Order cancelled successfully. Refund will be processed within 3-5 business days.');
    } catch (error) {
      toast.error('Failed to cancel order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-4">This order doesn't exist or you don't have permission to view it.</p>
          <Link to="/restaurants" className="text-primary-600 hover:text-primary-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${order.status === 'cancelled' ? 'bg-red-100' : 'bg-green-100'}`}>
              {order.status === 'cancelled' ? (
                <X className="h-12 w-12 text-red-600" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-600" />
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {order.status === 'cancelled' ? 'Order Cancelled' : 'Order Confirmed!'}
          </h1>
          <p className="text-lg text-gray-600">
            {order.status === 'cancelled' 
              ? 'Your order has been cancelled. Refund will be processed soon.'
              : 'Thank you for your order. We\'re preparing your delicious meal.'
            }
          </p>
          {order.status !== 'cancelled' && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">Estimated delivery: {order.estimatedDeliveryTime}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                {order.canCancel && order.status !== 'cancelled' && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelling ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Cancelling...</span>
                      </div>
                    ) : (
                      'Cancel Order'
                    )}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Order Number:</span>
                  <p className="font-semibold">{order.orderNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600">Order Date:</span>
                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)} capitalize`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Payment:</span>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {order.payment.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Restaurant</h2>
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{order.restaurant.name}</h3>
                  <p className="text-gray-600">{order.restaurant.cuisine} Cuisine</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {order.restaurant.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {order.restaurant.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Order</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      {item.variants && item.variants.length > 0 && (
                        <div className="text-sm text-gray-600">
                          {item.variants.map((variant, index) => (
                            <span key={index}>
                              {variant.name}: {variant.option}
                              {variant.priceModifier > 0 && ` (+₹${variant.priceModifier.toFixed(2)})`}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.specialInstructions && (
                        <p className="text-sm text-gray-600 italic">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-semibold text-primary-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Delivery Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{order.pricing.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>₹{order.pricing.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST)</span>
                  <span>₹{order.pricing.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{order.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Address</h2>
              <div className="text-gray-600">
                <p className="font-medium text-gray-900">{order.customer.name}</p>
                <p>{order.deliveryAddress.street}</p>
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                </p>
                {order.deliveryAddress.instructions && (
                  <p className="mt-2 text-sm italic">
                    Instructions: {order.deliveryAddress.instructions}
                  </p>
                )}
                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {order.customer.phone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {order.customer.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/profile"
                className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center"
              >
                View All Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/restaurants"
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block"
              >
                Order Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;