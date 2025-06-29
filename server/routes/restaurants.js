import express from 'express';
import { body, validationResult } from 'express-validator';
import Restaurant from '../models/Restaurant.js';
import Product from '../models/Product.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      cuisine, 
      search, 
      sortBy = 'rating.average',
      order = 'desc',
      featured,
      isOpen 
    } = req.query;

    const query = { status: 'approved' };

    // Add filters
    if (cuisine) query.cuisine = cuisine;
    if (featured !== undefined) query.featured = featured === 'true';
    if (isOpen !== undefined) query.isOpen = isOpen === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 },
      populate: {
        path: 'owner',
        select: 'name email'
      }
    };

    const restaurants = await Restaurant.find(query)
      .populate(options.populate)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        current: options.page,
        pages: Math.ceil(total / options.limit),
        total
      }
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get restaurant by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name email');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/restaurants/:id/menu
// @desc    Get restaurant menu
// @access  Public
router.get('/:id/menu', async (req, res) => {
  try {
    const { category, available = true } = req.query;
    
    const query = { 
      restaurant: req.params.id,
      'availability.isAvailable': available === 'true'
    };
    
    if (category) query.category = category;

    const menuItems = await Product.find(query)
      .sort({ category: 1, name: 1 });

    res.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/restaurants
// @desc    Create restaurant
// @access  Private (Restaurant owners)
router.post('/', [
  auth,
  authorize('restaurant', 'admin'),
  body('name').trim().isLength({ min: 2 }).withMessage('Restaurant name is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('cuisine').isIn(['American', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Indian', 'Chinese', 'Mediterranean', 'French', 'Other']).withMessage('Invalid cuisine type'),
  body('contact.phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('contact.email').isEmail().withMessage('Valid email is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').notEmpty().withMessage('Zip code is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const restaurantData = {
      ...req.body,
      owner: req.user.userId
    };

    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;