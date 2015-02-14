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
        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
		callback( err, connection );
	});
};