const request = require('supertest');
const articles = require('./articles-model')


describe('delete function', () => {
    it('should delete the articles by article id', () => {
        articles.remove(1);
        return articles.findById(1).then(res => {
            expect(res).toBe(undefined)
        })
    })
})