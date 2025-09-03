import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// @desc    Health check
// @route   GET /api/health
// @access  Public
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development',
  });
});

// @desc    Database health check
// @route   GET /api/health/db
// @access  Public
router.get('/db', async (_req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    res.json({
      success: true,
      database: {
        status: dbStatus[dbState as keyof typeof dbStatus] || 'unknown',
        readyState: dbState,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
      },
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Database health check failed',
      timestamp: new Date().toISOString(),
    });
  }
});

// @desc    Detailed health check
// @route   GET /api/health/detailed
// @access  Public
router.get('/detailed', async (_req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    // Memory usage
    const memUsage = process.memoryUsage();

    res.json({
      success: true,
      server: {
        uptime: process.uptime(),
        environment: process.env['NODE_ENV'] || 'development',
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          rss: Math.round(memUsage.rss / 1024 / 1024 * 100) / 100, // MB
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100, // MB
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100, // MB
          external: Math.round(memUsage.external / 1024 / 1024 * 100) / 100, // MB
        },
      },
      database: {
        status: dbStatus[dbState as keyof typeof dbStatus] || 'unknown',
        readyState: dbState,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
      },
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Detailed health check failed',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router; 