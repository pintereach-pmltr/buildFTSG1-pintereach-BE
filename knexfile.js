module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/pintereach.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },

    testing: {
      client: "sqlite3",
      connection: {
        filename: "./database/test.db3"
      },
      useNullAsDefault: true,
      migrations: {
        directory: "./database/migrations"
      },
      seeds: {
        directory: "./database/seeds"
      }
    },

    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      }
    }
  },
  
};
