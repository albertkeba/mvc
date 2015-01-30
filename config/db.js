/*global require, module*/
/*http://stackoverflow.com/questions/19606647/module-exports-scope-and-node-mysql*/
var mysql = require('mysql'),
	pool = mysql.createPool({
		host	: 'localhost',
		user	: 'root',
		password: '',
		database: 'directory'
	});

module.exports.getConnection = function( callback ){
	'use strict';
	pool.getConnection(function(err, connection){
		callback( err, connection );
	});
};