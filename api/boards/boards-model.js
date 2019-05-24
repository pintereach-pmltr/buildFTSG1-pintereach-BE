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

const update = (id, edits) => {
    return db('boards')
    .where({id})
    .update(edits)
}
  
async function getBoardsAndArticles(id){
    const boards = await db('boards as b')
        .where({user_id: id })

    const articles = await db('articles as a')
        // .join('boards as b', 'b.id', '=', 'a.board_id')    
        // .where({user_id: id})
        // .select('a.article_label', 'a.url', 'a.id')
        // .where('a.board_id', id)
    boards.forEach(function(board){
        // console.log(`here are the board ids`, board.id);
        articles.forEach(function(article){
            // console.log(`article board id:`, article.board_id)
            if(article.board_id == board.id){
                // console.log('looking at this article: ', article)
                if (board.articles){
                    board.articles.push(article)
                } else{
                    board.articles = [article]; 
                }
                // console.log(`state of boards.articles `, board.articles)
            }
        })
    })
    // console.log(`here are the boards`, boards)
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
    update,
    insert,
    remove,
    getBoardsAndArticles
}

