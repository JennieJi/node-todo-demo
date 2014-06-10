var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost/todo';

var connect = function() {
	mongoose.connect(DB_URL);
};
connect();

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});

exports.connect = function(callback) {
	connect();
	if(typeof(callback) == 'function' ) { callback(); }
};

exports.disconnect = function(callback) {
	mongoose.disconnect(callback);
};