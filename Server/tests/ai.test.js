import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Taktikal AI Assistant API', () => {
    it('POST /api/ai/chat should require authentication', async () => {
        const res = await request(app)
            .post('/api/ai/chat')
            .send({ message: 'Suggest a training drill' });
        expect(res.statusCode).toEqual(401);
    });
});
