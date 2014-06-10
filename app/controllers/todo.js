var Todo = require(__dirname + '/../models/todo.js').model;



exports.create = function(req, res) {
	Todo.create({
		subject: req.body.subject
	});
};

exports.remove = function(req, res) {
	Todo.remove(req.body.id);
};

exports.done = function(req, res) {
	Todo.done(req.body.id);
};

exports.list = function(options, callback) {
	return Todo.list(options, callback);
};