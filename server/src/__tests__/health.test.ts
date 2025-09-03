import request from 'supertest';
import app from '../index.js';

describe('Health Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return server health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is running');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /api/health/db', () => {
    it('should return database health status', async () => {
      const response = await request(app)
        .get('/api/health/db')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.database).toHaveProperty('status');
      expect(response.body.database).toHaveProperty('readyState');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/health/detailed', () => {
    it('should return detailed system health', async () => {
      const response = await request(app)
        .get('/api/health/detailed')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.server).toHaveProperty('uptime');
      expect(response.body.server).toHaveProperty('environment');
      expect(response.body.server).toHaveProperty('nodeVersion');
      expect(response.body.server).toHaveProperty('platform');
      expect(response.body.server.memory).toHaveProperty('rss');
      expect(response.body.server.memory).toHaveProperty('heapTotal');
      expect(response.body.server.memory).toHaveProperty('heapUsed');
      expect(response.body.server.memory).toHaveProperty('external');
      expect(response.body.database).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
}); 