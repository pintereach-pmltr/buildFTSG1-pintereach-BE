
const request = require('supertest');
const Server = require('../api/server');
const db = require('../database/dbConfig');


afterAll(() => {
    return db('users').truncate();
  });


    describe('authorization', () => {
        it('should register with status 201', () => {
            return request(Server)
            .post('/api/auth/register')
            .send({
                username: 'username',
                password: 'password'
            })
            .then(res => {
                expect(res.status).toBe(201);
            });
        });

        it('should register with status 422', () => {
            const newUser = {
                username: "",
                password: "password"
            }

            return request(Server)
            .post('/api/auth/register')
            .send(newUser)
            .then(res => {
                expect(res.status).toBe(422)
            });
        })
    })

    // describe('POST /login', () => {
    //     it('should login with status 200', () => {
    //         const newUser = {
    //             username: "test",
    //             password: "password"
    //         }

    //         return request(Server)
    //         .post('api/auth/login')
    //         .send(newUser)
    //         .then(res => {
    //             expect(200)
    //         });

    //     })
    // })

    //     it('should login with status 400', () => {
    //         const newUser = {
    //             username: "admin",
    //             password: "password"
    //         }

    //         return request(Server)
    //         .post('/login')
    //         .send(newUser)
    //         .then(res => {
    //             expect(400)
    //         });

    //     })


