var dbConfig = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1:3306',
        user: 'root',
        password: 'root',
        database: 'dahengpro',
        charset :'utf8'
    }
}

var knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);