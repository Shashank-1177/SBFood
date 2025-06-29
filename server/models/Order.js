import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  price: Number,
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
  specialInstructions: String
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [orderItemSchema],
  pricing: {
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    serviceFee: { type: Number, default: 0 },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    instructions: String
  },
  contact: {
    phone: { type: String, required: true },
    email: String
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'cash', 'digital_wallet'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  status: {
    type: String,
    enum: [
      'placed',
      'confirmed',
      'preparing',
      'ready',
      'picked_up',
      'delivered',
      'cancelled'
    ],
    default: 'placed'
  },
  timeline: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  specialInstructions: String,
  rating: {
    food: { type: Number, min: 1, max: 5 },
    delivery: { type: Number, min: 1, max: 5 },
    overall: { type: Number, min: 1, max: 5 },
    comment: String,
    ratedAt: Date
  },
  cancellation: {
    reason: String,
    cancelledBy: { type: String, enum: ['customer', 'restaurant', 'admin'] },
    cancelledAt: Date,
    refundAmount: Number
  }
}, {
  timestamps: true
});

// ✅ Pre-save hook to auto-generate unique order number
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    try {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      this.orderNumber = `ORD-${timestamp}-${random}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// ✅ Optimized Indexes
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

export default mongoose.model('Order', orderSchema);
