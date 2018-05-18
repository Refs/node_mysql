var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var knex = require('./db/knex');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.put('/todos/:id', function(req,res) {
    // knex.raw(
    //     'UPDATE todos SET ' + req.body.field +  '= ? WHERE id = ?',
    //     [req.body.value, req.params.id]
    // )
    knex('todos').where('id', req.params.id)
                 .update({
                     title: req.body.title,
                     completed: req.body.completed
                 })
                 .then( function(){
                     return knex.select().from('todos')
                 })
                 .then(function(todos) {
                     res.send(todos);
                 })
})

app.get('/todos-of-user/:id', function(req, res) {
    knex.from('todos')
        .innerJoin('users', 'todos.user_id', 'users.id')
        .where('todos.user_id', req.params.id)
        .then(function(data) {
            res.send(data);
        })
})


app.listen(port, function() {
    console.log('listening on port:', port);
})