
const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');


// afterAll(() => {
//     return db('users').truncate();
//   });


describe('authorization', () => {
    describe('POST /register', () => {
        it('should register with status 201', () => {
            const newUser = {
                username: "test",
                password: "password"
            }

            return request(server)
            .post('api/auth/register')
            .send(newUser)
            .then(res => {
                expect(201)
            });

        })

        it('should register with status 422', () => {
            const newUser = {
                username: "",
                password: "password"
            }

            return request(server)
            .post('/register')
            .send(newUser)
            .then(res => {
                expect(422)
            });
        })
    })

    describe('POST /login', () => {
        it('should login with status 200', () => {
            const newUser = {
                username: "test",
                password: "password"
            }

            return request(server)
            .post('/login')
            .send(newUser)
            .then(res => {
                expect(200)
            });

        })

        it('should login with status 400', () => {
            const newUser = {
                username: "admin",
                password: "password"
            }

            return request(server)
            .post('/login')
            .send(newUser)
            .then(res => {
                expect(400)
            });

        })
    })
})


