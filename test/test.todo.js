/**
 * Module dependencies
 */
var assert = require("assert");
var db = require('../app/controllers/db');
var Todo = require('../app/models/todo').model;

describe('todo controlls test', function(){

	describe('create', function(){
		it('should save without error', function(done){
			var todo = new Todo();
			todo.subject = 'test';
			todo.save(function(err){
				if(err) throw err;
				done();
			});
		});
		it('should have 1 record after create', function(done){
			Todo.count(function(err, count){
				assert.equal(1, count);
				done();
			});
		});
		it('the created test record can be found', function(done){
			Todo.find({subject: 'test'}, function(err, todos){
				assert.equal(1, todos.length);
				done();
			});
		});
	});

	after(function(done){
		Todo.collection.remove(done);
	});
});