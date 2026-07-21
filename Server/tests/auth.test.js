import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Taktikal API Integration Tests', () => {
    it('GET / should return server status', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('online');
    });

    it('GET /api/health should return ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('ok');
    });

    it('POST /api/auth/register should fail on missing fields', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test' });
        expect(res.statusCode).toEqual(400);
    });

    it('POST /api/auth/login should fail on missing input', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: '' });
        expect(res.statusCode).toEqual(400);
    });
});
