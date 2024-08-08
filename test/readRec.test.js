const request = require('supertest');

const app = require('../index.js'); // Adjust the path to your app

describe('Login', () => {
  it('should allow user to login', async () => {
    const response = await request(app).get('/auth');
    expect(response.statusCode).toBe(200);
  });
});

describe('Register', () => {
    it('should allow user to Register', async () => {
      const response = await request(app).get('/auth/new');
      expect(response.statusCode).toBe(200);
    });
  });


