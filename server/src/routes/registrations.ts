import express from 'express';
import { body } from 'express-validator';
import { Registration } from '../models/Registration.js';
import { Event } from '../models/Event.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private
import { Request, Response } from 'express';

router.post('/', [
  protect,
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('dietaryRestrictions').optional().isLength({ max: 200 }).withMessage('Dietary restrictions cannot be more than 200 characters'),
  body('specialRequirements').optional().isLength({ max: 500 }).withMessage('Special requirements cannot be more than 500 characters'),
  body('emergencyContact.name').notEmpty().withMessage('Emergency contact name is required'),
  body('emergencyContact.phone').notEmpty().withMessage('Emergency contact phone is required'),
  body('emergencyContact.relationship').notEmpty().withMessage('Emergency contact relationship is required'),
], async (req: Request, res: Response) => {
  try {
    const { eventId, dietaryRestrictions, specialRequirements, emergencyContact } = req.body;

    // Check if event exists and is active
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    if (!event.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Event is not active',
      });
    }

    // Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        error: 'Event is full',
      });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      user: req.user.id,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        error: 'You are already registered for this event',
      });
    }

    // Create registration
    const registration = await Registration.create({
      user: req.user.id,
      event: eventId,
      dietaryRestrictions,
      specialRequirements,
      emergencyContact,
    });

    // Update event participant count
    event.currentParticipants += 1;
    await event.save();

    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get user's registrations
// @route   GET /api/registrations/my-registrations
// @access  Private
router.get('/my-registrations', protect, async (req: Request, res: Response) => {
  try {
    const registrations = await Registration.find({ user: req.user?.id })
      .populate({
        path: 'event',
        select: 'title date startTime endTime location category image',
      })
      .sort({ registrationDate: -1 });

    res.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get single registration
// @route   GET /api/registrations/:id
// @access  Private
router.get('/:id', protect, async (req: Request, res: Response) => {
  try {
          const registration = await Registration.findById(req.params['id'])
        .populate({
        path: 'event',
        select: 'title date startTime endTime location category image description',
      })
      .populate('user', 'name email');

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found',
      });
    }

    // Check if user owns this registration or is admin
    if (registration.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to view this registration',
      });
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Cancel registration
// @route   PUT /api/registrations/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req: Request, res: Response) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found',
      });
    }

    // Check if user owns this registration or is admin
    if (registration.user.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to cancel this registration',
      });
    }

    if (registration.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Registration is already cancelled',
      });
    }

    registration.status = 'cancelled';
    await registration.save();

    // Update event participant count
    const event = await Event.findById(registration.event);
    if (event && (registration.status as string) === 'confirmed') {
      event.currentParticipants = Math.max(0, event.currentParticipants - 1);
      await event.save();
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Submit feedback for event
// @route   POST /api/registrations/:id/feedback
// @access  Private
router.post('/:id/feedback', [
  protect,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 500 }).withMessage('Comment cannot be more than 500 characters'),
], async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;

    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found',
      });
    }

    // Check if user owns this registration
    if (registration.user.toString() !== req.user?.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to submit feedback for this registration',
      });
    }

    if (registration.feedback) {
      return res.status(400).json({
        success: false,
        error: 'Feedback already submitted',
      });
    }

    registration.feedback = {
      rating,
      comment,
      submittedAt: new Date(),
    };

    await registration.save();

    res.json({
      success: true,
      data: registration,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get event registrations (admin only)
// @route   GET /api/registrations/event/:eventId
// @access  Private
router.get('/event/:eventId', protect, async (req: Request, res: Response) => {
  try {
    // Check if user is admin or event organizer
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    if (event.organizer.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to view event registrations',
      });
    }

    const registrations = await Registration.find({ event: req.params['eventId'] })
      .populate('user', 'name email organization position')
      .sort({ registrationDate: 1 });

    res.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router; 