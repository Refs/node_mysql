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

1. Create a FK

```bash
# In order to get this work, I had to do the following:

# 1. Create the parent tables first, then create the child tables (parallel issue mentioned above)
# 2. I'm using table.increments('id') to create the primary key of the parent tables, and this creates them as unsigned auto_increment integers.
# 3.  To have it actually create the foreign key, I had to something like:
table.integer('parentid').unsigned().references('id').inTable('parent');

# Where parentid is the field in the child table that should reference the field id in the parent table.

# The unsigned part in step 3 was key. MySql wouldn't create the foreign key if the type didn't match, and it also seemed to silently fail in that case, though that could be a problem with my error handling.

```

> 因为 mysql 在创立外键的时候，必须要保证，外键所在的column 与 被引用的 column的类型完全一致，否则便创建不了。 即这一步若失败，则自己应该去navicat 中去仔细的看一下，两者是否是完全匹配的；


2. Create migration file and run it 

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

```bash
knex seed:make 01_users
knex seed:make 01_todos

```


