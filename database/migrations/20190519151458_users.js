
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
        .string('title', 200)
        .notNullable()

      boards
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      })

    //articles
    .createTable('articles', articles => {
      articles 
        .string('url', 600)
        .notNullable() 

      articles
        .string('name', 200)
      
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
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      
      articles
        .specificType('categories', 'string ARRAY');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('boards')
    .dropTableIfExists('articles');
};