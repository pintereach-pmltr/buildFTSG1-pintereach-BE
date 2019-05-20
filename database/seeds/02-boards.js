
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('boards').del()
    .then(function () {
      // Inserts seed entries
      return knex('boards').insert([
        {id: 1, board_title: 'board1', user_id: 1},
        {id: 2, board_title: 'board2', user_id: 1},
        {id: 3, board_title: 'board3', user_id: 2}
      ]);
    });
};
