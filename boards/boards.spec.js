const request = require('supertest');
const boards = require('./boards-model')
const Server = require('../api/server')


describe('adding a new board', () => {

    it('will not allow unauthenticated request', () => {
        const newBoard = {
            board_title: "new board",
            user_id: 1
        }
        return request(Server)
        .post('/api/boards')
        .send({newBoard})
        .then(res => {
            expect(res.status).toBe(401)
        })
    })
})


describe('delete function', () => {
    it('should delete the board by board id', () => {
        boards.remove(1);
        return boards.findById(1).then(res => {
            expect(res).toBe(undefined)
        })
    })
})