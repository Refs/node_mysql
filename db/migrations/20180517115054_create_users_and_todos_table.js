
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
      table.integer('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos')
                      .dropTable('users');
};
   