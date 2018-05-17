
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
        // table.integer('user_id').references('id').inTable('users');
        //   table.integer('user_id').unsigned();
        //   table.foreign('user_id').references('id').inTable('users');
        table.integer('user_id').unsigned().references('id').inTable('users');
        // table.integer('UserId',11).unsigned().inTable('User').references('UserId');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos')
                      .dropTable('users');
};
   