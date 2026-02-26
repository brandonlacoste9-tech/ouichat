const request = require('supertest');
const app = require('../src/index');

describe('License Verification API', () => {
  describe('GET /', () => {
    it('should return welcome message with company info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('company');
      expect(response.body.company).toContain('Northern-Ventures');
    });
  });

  describe('GET /api/license/rbq/:licenseNumber', () => {
    it('should verify a valid RBQ license format', async () => {
      const response = await request(app)
        .get('/api/license/rbq/5678-1234-01')
        .expect(200);

      expect(response.body).toHaveProperty('licenseNumber');
      expect(response.body).toHaveProperty('type', 'RBQ');
      expect(response.body).toHaveProperty('valid');
    });

    it('should reject invalid RBQ license format', async () => {
      const response = await request(app)
        .get('/api/license/rbq/invalid')
        .expect(200);

      expect(response.body.valid).toBe(false);
      expect(response.body.status).toBe('FORMAT_INVALIDE');
    });

    it('should return 400 if license number is missing', async () => {
      const response = await request(app)
        .get('/api/license/rbq/')
        .expect(404);
    });
  });

  describe('GET /api/license/req/:licenseNumber', () => {
    it('should verify a valid REQ license format', async () => {
      const response = await request(app)
        .get('/api/license/req/123456')
        .expect(200);

      expect(response.body).toHaveProperty('licenseNumber');
      expect(response.body).toHaveProperty('type', 'REQ/CMEQ');
      expect(response.body).toHaveProperty('valid');
    });

    it('should reject invalid REQ license format', async () => {
      const response = await request(app)
        .get('/api/license/req/abc')
        .expect(200);

      expect(response.body.valid).toBe(false);
      expect(response.body.status).toBe('FORMAT_INVALIDE');
    });
  });

  describe('POST /api/license/verify', () => {
    it('should verify multiple licenses', async () => {
      const response = await request(app)
        .post('/api/license/verify')
        .send({
          licenses: [
            { number: '5678-1234-01', type: 'RBQ' },
            { number: '123456', type: 'REQ' }
          ]
        })
        .expect(200);

      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results).toHaveLength(2);
    });

    it('should return 400 if licenses array is missing', async () => {
      const response = await request(app)
        .post('/api/license/verify')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle unsupported license types', async () => {
      const response = await request(app)
        .post('/api/license/verify')
        .send({
          licenses: [
            { number: '12345', type: 'UNKNOWN' }
          ]
        })
        .expect(200);

      expect(response.body.results[0].valid).toBe(false);
      expect(response.body.results[0].error).toContain('non supporté');
    });
  });
});
