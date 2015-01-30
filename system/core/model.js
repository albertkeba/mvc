/*jslint devel: true*/
/*global require,module*/
var db = require('../../config/db.js');

module.exports = (function(){
	'use strict';
	var _db = null;
	
	function Model(){
		this._db = db;
		console.log(this._db);
	}
	
	Model.prototype.select = function( query ){
		this._db.getConnection(function(err, connection){
			if ( ! err )
			{
				connection.query( query, function(err, rows){
					if ( ! err )
					{
						return rows;
					}
				});
			}
			else
			{
				return false;
			}
		});
	};
	
	return Model;
}());