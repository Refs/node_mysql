
exports.up = function(knex, Promise) {
  return knex.raw(
      'ALTER TABLE todos CHANGE `complated` `completed` TINYINT NOT NULL'
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    'ALTER TABLE todos CHANGE `completed` `complated` TINYINT NOT NULL'
  )
};
