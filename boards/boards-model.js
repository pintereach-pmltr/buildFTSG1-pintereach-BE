const db = require('../database/dbConfig');

function getAllUserBoards(id) {
    return db('boards').where({ user_id: id});
}

function findById(id) {
    return db('boards')
        .where({ id })
        .first();
}

// async function getArticles(id){
//     const board = await db('boards')
//         .where({id})
//         .first();
//     console.log(board)
//     const articles = await db('articles as a')
//         .select('a.name')
//         .where('a.board_id', id)
//     console.log('get', articles)
//     return {board, articles: [...articles]};
// }


// function add(board) {
//     return db('boards')
//       .insert(board, 'id')
//       .then(([id]) => findById(id));
//       };
  

const insert = body => {
    return db('boards')
        .insert(body)
        .then(([id]) => getById(id));
};
  
const remove = id => {
    return db('boards')
        .where({ id })
        .del();
}

module.exports = {
    getAllUserBoards,
    findById,
    insert,
    remove
}

