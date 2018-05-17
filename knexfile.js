// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'cjs'
    },
    pool: {
        min: 2,
        max: 10
    },
    // spec the directory of the migration which the offical document hasn't described;
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds/development'
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
          directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds/production'
    }
  }

};
