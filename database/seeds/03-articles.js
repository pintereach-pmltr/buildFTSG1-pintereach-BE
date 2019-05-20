
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {url: "url 1", article_label: 'new article pinned 1', board_id: 1,},
        {url: "url 2", article_label: 'new article pinned 2', board_id: 2},
        {url: "url 3", article_label: 'new article pinned 3', board_id: 1},
      ]);
    });
};
