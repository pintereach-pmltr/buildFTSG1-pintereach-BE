
const request = require('supertest');
const Server = require('../api/server');
const db = require('../database/dbConfig');


  describe('adding a new article', () => {

    it('will not allow unauthenticated request', () => {
        const newArticle = {
            article_label: "new article",
            url: "url",
            board_id: 1
        }
        return request(Server)
        .post('/api/articles')
        .send({newArticle})
        .then(res => {
            expect(res.status).toBe(401)
        })
    })
})


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

    describe('POST api/auth/login', () => {

        beforeEach(() => {
            return request(Server)
            .post('/api/auth/register')
            .send({
                username: "username",
                password: "password"
            });
        });

        it('should login with status 200', () => {
            return request(Server)
            .post('/api/auth/login')
            .send({
                username: "username",
                password: "password"
            })
            .then(res => {
                expect(res.status).toBe(200)
            });
        })

        it('should login with status 400', () => {
            const newUser = {
                username: "admin",
                password: "password"
            }

            return request(Server)
            .post('/api/auth/login')
            .send(newUser)
            .then(res => {
                expect(400)
            });
        })

    })



