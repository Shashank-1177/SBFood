import React from 'react';
import axios from 'axios';

const Checkout = ({ user, cartItems, selectedRestaurantId }) => {
  const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculateTotal = () => calculateSubtotal() + 30 + 10 + 15; // Example fees

  const placeOrder = async () => {
    try {
      const response = await axios.post('/api/orders', {
        orderNumber: Date.now(),
        customer: user._id,
        restaurant: selectedRestaurantId,
        items: cartItems,
        pricing: {
          subtotal: calculateSubtotal(),
          deliveryFee: 30,
          serviceFee: 10,
          tax: 15,
          discount: 0,
          total: calculateTotal(),
        },
        deliveryAddress: {
          street: '123 Street',
          city: 'City',
          state: 'State',
          zipCode: '123456',
          coordinates: { latitude: 12.34, longitude: 56.78 },
          instructions: 'Ring the bell',
        },
        contact: {
          phone: user.phone,
          email: user.email,
        },
        payment: {
          method: 'card',
          status: 'pending',
        }
      });

      console.log('Order Placed:', response.data);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Order failed:', error.response?.data || error.message);
      alert('Failed to place order.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
