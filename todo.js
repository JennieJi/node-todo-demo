var express = require('express');
var app = express(),
	// fs = require('fs'),
	db = require(__dirname + '/app/controllers/db.js'),
	todo = require(__dirname + '/app/controllers/todo.js');

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());

db.connect();

// Main view
app.get('/', function(req, res){
	todo.list({}, function(err, todos) {
		res.render('todo.ejs', {
			todos: todos
		});
	});
});

// Create new todo
app.post('/add', function(req, res) {
	todo.create(req, res);
	res.redirect('/');
});

// Complete a todo
app.post('/done', function(req, res) {
	todo.done(req, res);
	res.redirect('/');
});

// Remove a todo
app.post('/remove', function(req, res){
	todo.remove(req, res);
	res.redirect('/');
});

// Develop views
app.get('/dev', function(req, res){
	todo.list({}, function(err, todos){
		res.send(todos);
	});
});


app.listen(3000);