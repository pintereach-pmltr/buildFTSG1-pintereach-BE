const Server = require('./server.js')
const request = require('supertest');


describe('GET /', () => {
        it('should return "its alive" if server is running', () => {
            
            return request(Server)
                .get('/')
                .expect({message: "It's alive!"})
                
        })

})

describe('server', () => {
        it('sets the environment to testing', () => {
          expect(process.env.DB_ENV).toBe('testing');
        });
})    