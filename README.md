# SB Foods - Complete Food Ordering MERN Application

A full-stack food delivery application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring modern design, real-time functionality, and comprehensive admin/restaurant management.

## 🚀 Features

### Customer Features
- **User Authentication**: Secure registration and login system
- **Location-based Search**: Find restaurants near your location
- **Restaurant Discovery**: Browse restaurants by cuisine, rating, and location
- **Menu Browsing**: Detailed menu with categories, dietary filters, and search
- **Shopping Cart**: Add/remove items with quantity management
- **Order Placement**: Secure checkout with multiple payment options (Card, UPI, Cash on Delivery)
- **Order Tracking**: Real-time order status updates with cancellation option
- **User Profile**: Manage personal information and view order history

### Restaurant Owner Features
- **Restaurant Dashboard**: Comprehensive management interface
- **Menu Management**: Add, edit, and manage food items
- **Order Management**: View and update order status
- **Analytics**: Track sales, popular items, and performance metrics

### Admin Features
- **Admin Dashboard**: Platform overview and analytics
- **User Management**: Manage customer and restaurant accounts
- **Restaurant Approval**: Review and approve new restaurants
- **Order Monitoring**: Oversee all platform orders
- **Content Management**: Manage featured restaurants and promotions

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security
- **CORS** for cross-origin requests
- **Rate Limiting** for API protection

## 📁 Project Structure

```
sb-foods/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin pages
│   │   │   ├── customer/   # Customer pages
│   │   │   └── restaurant/ # Restaurant owner pages
│   │   └── styles/         # CSS files
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd sb-foods
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sbfoods
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=http://localhost:3000
   ```

5. **Start the application**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 🌟 Key Features Implemented

### Enhanced Indian Food Experience
- **Indian Restaurant Focus**: Featured Indian restaurants with authentic cuisine
- **Regional Variety**: Restaurants from different Indian states and regions
- **Spice Level Indicators**: Clear marking of spice levels for dishes
- **Indian Currency**: All prices displayed in Indian Rupees (₹)
- **Local Locations**: Indian cities and states for location-based search

### Advanced Order Management
- **User-Specific Orders**: Each user sees only their own orders
- **Order Cancellation**: Users can cancel orders with refund processing
- **Real-time Status**: Order status tracking from placement to delivery
- **Order History**: Complete order history with reorder functionality

### Location-Based Services
- **Location Search**: Find restaurants based on user location
- **Popular Locations**: Quick access to major Indian cities
- **GPS Integration**: Use current location for restaurant discovery
- **Distance Calculation**: Show delivery distance and time

### Payment Integration
- **Multiple Payment Methods**: Card, UPI, and Cash on Delivery
- **Secure Processing**: Mock payment processing with status tracking
- **Indian Payment Methods**: UPI integration for Indian users

## 📱 Demo Accounts

### Customer Account
- Email: customer@example.com
- Password: password123

### Restaurant Owner Account
- Email: restaurant@example.com
- Password: password123

### Admin Account
- Email: admin@example.com
- Password: password123

## 🔧 Development

### Running in Development Mode
```bash
# Start backend
cd server && npm run dev

# Start frontend (in another terminal)
cd client && npm run dev
```

### Building for Production
```bash
# Build frontend
cd client && npm run build

# Start production server
cd server && npm start
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the server directory
3. Ensure MongoDB connection is configured

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update the `MONGODB_URI` in your environment variables
3. Configure network access and database users

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Restaurant Endpoints
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id/status` - Update order status

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: support@sbfoods.com
- Issues: Create an issue in the repository

---

**SB Foods** - Delivering delicious Indian food with modern technology! 🍕🚀