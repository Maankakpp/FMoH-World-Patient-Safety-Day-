import express from 'express';
import { body } from 'express-validator';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { sendEmail } from '../utils/email.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, organization, position, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email',
      });
    }

    // Create verification token
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      organization,
      position,
      phone,
      emailVerificationToken,
      emailVerificationExpires,
    });

    // Send verification email
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${emailVerificationToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Email Verification',
      message: `Please click on the following link to verify your email: ${verificationUrl}`,
    });

    // Create token
    const token = jwt.sign({ id: String(user._id) }, process.env['JWT_SECRET'] || 'fallback-secret', {
      expiresIn: process.env['JWT_EXPIRES_IN'] || '30d',
    } as jwt.SignOptions);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Please provide a password'),
], async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Create token
    const token = jwt.sign({ id: String(user._id) }, process.env['JWT_SECRET'] || 'fallback-secret', {
      expiresIn: process.env['JWT_EXPIRES_IN'] || '30d',
    } as jwt.SignOptions);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
router.get('/verify-email/:token', async (req: express.Request, res: express.Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token',
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined as unknown as string;
    user.emailVerificationExpires = undefined as unknown as Date;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Please provide a valid email'),
], async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Send reset email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`,
    });

    res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
router.post('/reset-password/:token', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req: express.Request, res: express.Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token || '')
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token',
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined as unknown as string;
    user.resetPasswordExpires = undefined as unknown as Date;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById(req.user?.id);
    res.json({
      success: true,
      user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router; 