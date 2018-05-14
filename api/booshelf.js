var dbConfig = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1:3306',
        user: 'root',
        password: '123456',
        database: 'dahengpro',
        charset :'utf8'
    },
    pool: {
        afterCreate: function (conn, done) {
         console.log('lian jie cheng gong');
        }
      }

}


var knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);