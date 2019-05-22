
const request = require('supertest');
const Server = require('../api/server');
const db = require('../database/dbConfig');


// afterAll(() => {
//     return db('users').truncate();
//   });


describe('authorization', () => {

    it('should register with status 201', () => {
        return request(Server)
          .post('/api/auth/register')
          .send({
            username: 'administration',
            password: 'password',
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    // describe('POST /register', () => {
    //     it('should register with status 201', done => {
    //         const newUser = {
    //             username: "test",
    //             password: "password"
    //         }

    //         axios.post('/register', newUser).then(res => {
    //             expect(res.success).toBe(true);
    //             done();
    //         })
    //     });


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
    //         .post('/login')
    //         .send(newUser)
    //         .then(res => {
    //             expect(404)
    //         });

    //     })

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
    // })


