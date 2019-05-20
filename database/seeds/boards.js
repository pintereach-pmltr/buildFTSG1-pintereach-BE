
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('boards').del()
    .then(function () {
      // Inserts seed entries
      return knex('boards').insert([
        {id: 1, title: 'board1', user_id: 1},
        {id: 2, title: 'board2', user_id: 1},
        {id: 3, title: 'board3', user_id: 2}
      ]);
    });
};
