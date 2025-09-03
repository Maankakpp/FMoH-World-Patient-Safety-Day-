import express from 'express';
import { body } from 'express-validator';
import { Event } from '../models/Event.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all events
// @route   GET /api/events
// @access  Public
import { Request, Response } from 'express';

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Event.countDocuments({ isActive: true });

    const events = await Event.find({ isActive: true })
      .populate('organizer', 'name email')
      .sort({ date: 1 })
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
      count: events.length,
      pagination,
      data: events,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params['id'])
      .populate('organizer', 'name email organization');

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private
router.post('/', [
  protect,
  authorize('admin', 'moderator'),
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('date').isISO8601().withMessage('Please provide a valid date'),
  body('startTime').notEmpty().withMessage('Please provide a start time'),
  body('endTime').notEmpty().withMessage('Please provide an end time'),
  body('location.venue').trim().notEmpty().withMessage('Please provide a venue'),
  body('location.address').trim().notEmpty().withMessage('Please provide an address'),
  body('location.city').trim().notEmpty().withMessage('Please provide a city'),
  body('location.state').trim().notEmpty().withMessage('Please provide a state'),
  body('location.zipCode').trim().notEmpty().withMessage('Please provide a zip code'),
  body('location.country').trim().notEmpty().withMessage('Please provide a country'),
  body('category').isIn(['workshop', 'seminar', 'conference', 'exhibition', 'other']).withMessage('Please provide a valid category'),
  body('maxParticipants').isInt({ min: 1 }).withMessage('Maximum participants must be at least 1'),
], async (req: Request, res: Response) => {
  try {
    req.body.organizer = req.user?.id;
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
router.put('/:id', [
  protect,
  authorize('admin', 'moderator'),
], async (req: Request, res: Response) => {
  try {
    let event = await Event.findById(req.params['id']);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    // Make sure user is event organizer or admin
    if (event.organizer.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this event',
      });
    }

    event = await Event.findByIdAndUpdate(req.params['id'], req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: event,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
router.delete('/:id', [
  protect,
  authorize('admin', 'moderator'),
], async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params['id']);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    // Make sure user is event organizer or admin
    if (event.organizer.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this event',
      });
    }

    await event.deleteOne();

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

// @desc    Get events by category
// @route   GET /api/events/category/:category
// @access  Public
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      category: req.params['category'],
      isActive: true,
    }).populate('organizer', 'name email');

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Search events
// @route   GET /api/events/search
// @access  Public
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, category, date } = req.query as Record<string, string | undefined>;
    const query: Record<string, unknown> = { isActive: true };

    if (q) {
      query['$or'] = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ];
    }

    if (category) {
      query['category'] = category;
    }

    if (date) {
      const searchDate = new Date(date as string);
      query['date'] = {
        $gte: searchDate,
        $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000),
      };
    }

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router; 