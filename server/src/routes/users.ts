import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', [
  protect,
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('organization').optional().trim(),
  body('position').optional().trim(),
  body('phone').optional().trim(),
  body('address.street').optional().trim(),
  body('address.city').optional().trim(),
  body('address.state').optional().trim(),
  body('address.zipCode').optional().trim(),
  body('address.country').optional().trim(),
  body('preferences.notifications').optional().isBoolean(),
  body('preferences.newsletter').optional().isBoolean(),
], async (req: Request, res: Response) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      organization: req.body.organization,
      position: req.body.position,
      phone: req.body.phone,
      address: req.body.address,
      preferences: req.body.preferences,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key as keyof typeof fieldsToUpdate] === undefined) {
        delete fieldsToUpdate[key as keyof typeof fieldsToUpdate];
      }
    });

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
router.put('/change-password', [
  protect,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
], async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user!.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect',
      });
    }

    user!.password = newPassword;
    await user!.save();

    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Upload profile picture
// @route   POST /api/users/profile-picture
// @access  Private
router.post('/profile-picture', protect, async (req: Request, res: Response) => {
  try {
    // This would typically use multer for file upload
    // For now, we'll just update the profile picture field
    const { profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture },
      { new: true }
    );

    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private
router.get('/', [
  protect,
  authorize('admin'),
], async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments();

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    // Pagination result
    const pagination: Record<string, unknown> = {};

    if (endIndex < total) {
      pagination['next'] = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination['prev'] = {
        page: page - 1,
        limit,
      };
    }

    res.json({
      success: true,
      count: users.length,
      pagination,
      data: users,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', [
  protect,
  authorize('admin'),
], async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params['id']).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update user role (admin only)
// @route   PUT /api/users/:id/role
// @access  Private
router.put('/:id/role', [
  protect,
  authorize('admin'),
  body('role').isIn(['user', 'admin', 'moderator']).withMessage('Please provide a valid role'),
], async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params['id'],
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private
router.delete('/:id', [
  protect,
  authorize('admin'),
], async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params['id']);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router; 