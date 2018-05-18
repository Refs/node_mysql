# knex

document： http://perkframework.com
video: https://www.youtube.com/watch?v=GbVP4Ac2QAo&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=4

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

1. generate seed.js file

```bash
knex seed:make 01_users
knex seed:make 02_todos

# this will generate .seeds/development/01_users.js, in which we can put test data 
```
> 注意seed file的命名都是有讲究的，因为 users 是父表， 需要先去运行， 而 todos 是子表， 需要后去运行， 所以我们就通过控制命名方式，来控制 seed file的运行顺序； 否则会报 外键的错误；


2. config seed

```js
// .seeds/development/01_users.js
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Some Guy', email: 'test1@test.com'},
        { id: 2, name: 'Some Girl', email: 'test2@test.com'},
        { id: 3, name: 'Somone Else', email: 'test3@test.com'}
      ]);
    });
};
```

3. run seed cli

```bash
knex seed:run
```

## establish the knex.js

> which export the knex instance

```bash
touch ./db/knex.js

```

```js
// knex.js

var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];

console.log(config);
module.exports = require('knex')(config);

```

## establish the server.js

```js
// server.js

ar express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8001;
var knex = require('./db/knex');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
    console.log('listening on port:', port);
})

```

## establish route 

### query spec row form spec table

```js
// server.js
app.get('/todos/:id', function(req,res) {
    // knex.raw(
    //     'SELECT * FROM todos'
    // )
    // .then(function(todos){
    //     res.json(todos[0]);
    // })
    // knex.raw(
    //     'SELECT * FROM todos WHERE id = 1'
    // )
    // .then (function(todo) {
    //     res.send(todo[0]);
    // })
    // knex.select().from('todos')
    //     .then(function(todos) {
    //         res.send(todos);
    //     })
    knex.select().from('users').where('id', req.params.id)
        .then(function(todo) {
            res.send(todo);
        })
})


//  下面的方式 与上面的方式相比，在于其已经将查询返回的 'todos' 格式处理好了， 我们直接将结果返回给前台就可以了；

```

### INSERT data into a table

```js
app.post('/todos', function(req, res) {
    // knex.raw(
    //     'INSERT INTO todos (title, user_id) VALUES  (?,?)',
    //     ['go play some sports', '1']
    // ).then(function (){
    //     return knex.select().from('todos')
    // })
    // .then (function (todos){
    //     res.send(todos);
    // })
    knex('todos').insert({
        title: req.body.title,
        user_id: req.body.user_id
    })
    .then(function() {
        return knex.select().from('todos')
    })
    .then(function(todos) {
        res.send(todos)
    })
})


```

### update table's data


### join 

> join is basically when you want more detailed information, the you can get out of a single table by ralating that data to another table.

```bash
SELECT * FROM todos INNER JOIN 
users ON todos.user_id = users.id
WHERE todos.user_id =3;

```

```js
app.get('/todos-of-user/:id', function(req, res) {
    // knex.raw(
        // 'SELECT * FROM todos INNER JOIN users ON todos.user_id = users.id WHERE todos.user_id= ?', [req.params.id]
    // )
    knex.from('todos')
        .innerJoin('users', 'todos.user_id', 'users.id')
        .where('todos_user_id', req.params.id)
        .then(function(data) {
            res.send(data);
        })
})

```

