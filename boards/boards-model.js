const db = require('../database/dbConfig');

const getAllUserBoards = id => {
    return db('boards')
    .where({ user_id: id});
}

const findById = id => {
    return db('boards')
        .where({ id })
        .first();
}
  
async function getBoardsAndArticles(id){
    const boards = await db('boards as b')
        .where({user_id: id })
        .first();
    console.log(boards)
    const articles = await db('articles as a')
        .join('boards as b', 'b.id', '=', 'a.board_id')    
        .select('a.article_label', 'a.url')
        // .where('a.board_id', id)

    console.log(articles)
    return{boards, articles: [...articles]};
}

const insert = body => {
    return db('boards')
        .insert(body)
        .then(([id]) => findById(id));
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
    remove,
    getBoardsAndArticles
}

