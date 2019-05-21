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
  

const insert = body => {
    db('boards')
        .insert(body)
    return db('boards')
        .where({ user_id: body.user_id });
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

