'use strict';

const supertest = require('supertest');
const server = require('../server.js');
const request = supertest(server.app);

describe('API Server', () => {

  it('should respond with 404 for invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  })

  it('should handle errors correctly', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
  })

  it('should respond correctly on root path', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello World');
  })

  it('should respond correctly on /data path', async () => {
    const response = await request.get('/data');
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.even).toBeDefined();
    expect(response.body.odd).toBeDefined();
  })
});
