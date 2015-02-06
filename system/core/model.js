/*jslint devel: true, white: true*/
/*global require,module*/
var db = require('../../config/db');

module.exports = (function(){
	'use strict';
	
	function Model(){}
	
	Model.prototype.select = function( query, callback ){
		db.getConnection(function(err, connection){
			connection.query( query, function( err, rows ){
				connection.release();
				
				if ( ! err && query && callback )
				{
					//console.log(rows);
					callback( rows );
				}
				else
				{
					throw err;
				}
			});
		});
	};
	//-- eo select
	
	Model.prototype.insert = function( query, post, callback ){
		db.getConnection(function( err, connection ){
			connection.query( query, post, function( err, result ){
				connection.release();
				
				if ( ! err && query && callback )
				{
					callback({
						success : true,
						insertId: result.insertId
					});
				}
			});
		});
	};
	//-- eo insert
	
	return Model;
}());