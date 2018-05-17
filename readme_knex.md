# knex

document： http://perkframework.com

## init knex config file

```bash
npx knex init
# will create a sample knexfile.js - the file which contains our various database configurations

# mkdir to store the migrations and seeds file , which secified in the knexfile.js
mkdir db 
mkdir db/migrations 
mkdir db/seeds
```

```js
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
          directory: __dirname + '/db/seeds/production'
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

```

## establish the knex.js

> which export the knex instance

```bash
touch ./db/knex.js

```

```js
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];

console.log(config);
module.exports = require('knex')(config);

```

## make our migrations

```bash
npx knex migrate:make create_users_and_todos_tables

```

```js
// 20180517115054_create_users_and_todos_table.js 中
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table){
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.timestamp('create_at').defaultTo(knex.fn.now());
      table.timestamp('update_at').defaultTo(knex.fn.now());
  })
  .createTable('todos', function(table) {
      table.increments();
      table.timestamp('create_at').defaultTo(knex.fn.now());
      table.timestamp('update_at').defaultTo(knex.fn.now());
      table.string('title').notNullable();
      table.boolean('complated').notNullable().defaultTo(false);
      
      // create a freign key that is going to tie it to the users table 
      table.integer('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos')
                      .dropTable('users');
};
   




```
