const db = require('../database/dbConfig');


const getAllArticles = async res => {
    return db('articles');
};

function getArticlesForUser(id){
    return db('articles').where({ board_id: id })
}

const findById = id => {
    return db('articles')
        .where({ id })
        .first();
}



// // function add(board) {
// //     return db('boards')
// //       .insert(board, 'id')
// //       .then(([id]) => findById(id));
// //       };
  

const insert = body => {
    return db('articles')
        .insert(body)
        .then(([id]) => findById(id));
};
  
const remove = id => {
    return db('articles')
        .where({ id })
        .del();
}

module.exports = {
    getAllArticles,
    getArticlesForUser,
    findById,
    insert,
    remove
}

