/*jslint devel: true*/
/*global require,module*/
var db = require('../../config/db');

module.exports = (function(){
	'use strict';
	var _db = null;
	
	function Model(){
		this._db = new db();
		console.log(this._db);
	}
	
	Model.prototype.select = function( query ){
		console.log(db);
		/*this._db.getConnection(function(err, connection){
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
				console.log(err);
			}
		});*/
	};
	
	return Model;
}());