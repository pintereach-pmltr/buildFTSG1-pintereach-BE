const request = require('supertest')
const server = require('../api/server')

describe('user routes', () => {
    describe('getAll', () => {
        it('should give return an error when request is not authenticated with a token', () => {
            return request(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
    });
 
})