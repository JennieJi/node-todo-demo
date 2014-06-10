var mongoose = require('mongoose');

/**
 * Shema
 */
var TodoSchema = new mongoose.Schema({
	createTime: {type: Date, default: Date.now},
	subject: String,
	done: {type: Boolean, default: false}
});

/**
 * Validations
 */
TodoSchema.path('subject').required(true, 'Subject of the remind is required!');

/**
 * Methods
 */

TodoSchema.methods = {
	create: function(data) {
		// Create new todo model and set subject value
		this = data;
		// Save the new model
		this.save(function(err){
			if(err) throw err;
		});
	}
};

/**
 * Static
 */

TodoSchema.statics = {
	list: function(options, callback) {
		options = options || {};
		callback = callback || function() {};
		this.find(options.expression || {})
			.exec(callback);
	},
	done: function(id) {
		this.findById(id, function(err, todo){
			// Set the done value of this todo model 'true'
			todo.done = true;
			// Save the updated model
			todo.save(function(err){
				if(err) throw err;
			});
		});
	},
	remove: function(id) {
		this.findById(id, function(err, todo){
			todo.remove(function(err) {
				if(err) throw err;
			});
		});
	}
};

mongoose.model('todo', TodoSchema);

exports.model = mongoose.model('todo');