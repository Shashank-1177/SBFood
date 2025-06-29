import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  variants: [{
    name: String,
    option: String,
    priceModifier: Number
  }],
  specialInstructions: String,
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastUpdated on save
cartSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Clear cart if switching restaurants
cartSchema.methods.switchRestaurant = function(newRestaurantId) {
  if (this.restaurant && this.restaurant.toString() !== newRestaurantId.toString()) {
    this.items = [];
  }
  this.restaurant = newRestaurantId;
};

export default mongoose.model('Cart', cartSchema);