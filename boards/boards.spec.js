const request = require('supertest');
const boards = require('./boards-model')

// describe('getAllUserBoards', () => {
//     it('should return all boards for that user id ', () => {
//       return boards.getAllUserBoards(1).then(res =>{
//           expect(res.data.length).toBeGreaterThan(0);
//       });
//     });
//   });

describe('delete function', () => {
    it('should delete the board by board id', () => {
        boards.remove(1);
        return boards.findById(1).then(res => {
            expect(res).toBe(undefined)
        })
    })
})