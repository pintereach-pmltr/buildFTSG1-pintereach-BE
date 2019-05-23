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

    const articles = await db('articles as a')
        .join('boards as b', 'b.id', '=', 'a.board_id')    
        .where({user_id: id})
        .select('a.article_label', 'a.url', 'a.id')
        .where('a.board_id', id)

    boards.forEach(function(board){
        console.log(board.board_id);
        articles.forEach(function(article){
            if(article.board_id = board.id){
                if (board.articles){
                    board.articles.push(article)
                } else {
                    board.articles = article; 
                }
            }
        })

    })
    console.log(boards)
    return{boards};
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

