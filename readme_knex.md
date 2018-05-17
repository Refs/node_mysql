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

// Assuming you might be using mysql, you need to specify that the UserId is .unsigned()

exports.up = function(knex, Promise) {
  return knex.schema.
    createTable('users', function (table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    })
    .createTable('todos', function(table) {
        table.increments('id').primary();
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
        table.string('title').notNullable();
        table.boolean('complated').notNullable().defaultTo(false);

        // foreign key : Assuming you might be using mysql, you need to specify that the UserId is .unsigned()
        table.integer('user_id').unsigned().references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos')
                      .dropTable('users');
};
   
```

```bash
# 运行 migration 使文件生效-----在数据库中，生成相应的 columns 实际上运行的是 exports.up function
knex migrate:latest

# 撤销更改 实际上运行的是 export.down function
knex migrate:rollback


```

## make our seeds --  the random test data



Assuming you might be using mysql, you need to specify that the UserId is .unsigned()

You also shouldn't need that defer there, you can just return the knex.schema.createTable.

```js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('User',function (table){ 
      table.increments('UserId').primary();
      table.string('username');
      table.string('email',60);
      table.string('password',65);
      table.timestamps();
  })
  .then(function () {
    return knex.schema.createTable('Comment',function(table){
      table.increments('CommentId').primary();
      table.string('Comment');
      table.integer('UserId',11).unsigned().inTable('User').references('UserId');
    });     
  });
};
```
