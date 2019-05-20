
exports.up = function(knex) {
  return knex.schema

  //users
    .createTable('users', users => {
      users.increments();

      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
    })

    //boards 
    .createTable('boards', boards => {
      boards.increments();

      boards 
        .string('board_title', 200)
        .notNullable()

      boards
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      })

    //articles
    .createTable('articles', articles => {
      articles.increments(); 

      articles 
        .string('url', 600)
        .notNullable() 

      articles
        .string('article_label', 200)
      
      // articles 
      //   .boolean('is_saved')
      //   .notNullable()
      //   .defaultTo(false)

      articles 
        .integer('board_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('boards')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      
      // articles
      //   .specificType('categories', 'string ARRAY');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('boards')
    .dropTableIfExists('articles');
};