const db = require('../database/dbConfig');


const getAllArticles = async res => {
    return db('articles');
};

function getArticlesForUser(id){
    return db('articles').where({ board_id: id })
}



// // function add(board) {
// //     return db('boards')
// //       .insert(board, 'id')
// //       .then(([id]) => findById(id));
// //       };
  

const insert = body => {
    return db('articles')
        .insert(body)
        .then(([id]) => getById(id));
};
  
// const remove = id => {
//     return db('boards')
//         .where({ id })
//         .del();
// }

module.exports = {
    getAllArticles,
    getArticlesForUser,
    insert,
}

