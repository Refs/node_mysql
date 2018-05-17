var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8001;
var knex = require('./db/knex');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/todos', function(req,res) {
    // knex.raw(
    //     'SELECT * FROM todos'
    // )
    // .then(function(todos){
    //     res.json(todos[0]);
    // })
    knex.select().from('todos')
        .then(function(todos) {
            res.send(todos);
        })
})



app.listen(port, function() {
    console.log('listening on port:', port);
})