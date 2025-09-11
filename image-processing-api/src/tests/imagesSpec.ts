import supertest from 'supertest';
import app from '../index';
import logger from '../utils/logger';

const request = supertest(app);

describe('Test /api/images endpoint', () => {
  it('should return 400 if no filename is provided', async () => {
    const response = await request.get('/api/images?width=200&height=200');
    expect(response.status).toBe(400);
    logger.info('Test: 400 returned when filename is missing');
  });

  it('should return 400 if width or height is missing', async () => {
    const response = await request.get('/api/images?filename=image1&width=200');
    expect(response.status).toBe(400);
    logger.info('Test: 400 returned when width or height is missing');
  });

  it('should return 200 for valid params', async () => {
    const response = await request.get('/api/images?filename=image1&width=200&height=200');
    expect(response.status).toBe(200);
    logger.info('Test: 200 returned for valid parameters');
  });
});
