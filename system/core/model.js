/*jslint devel: true, white: true, nomen: true*/
/*global require,module*/
var db = require('../../config/db');

module.exports = (function(){
	'use strict';
	
	function Model(){}
	
	Model.prototype.select = function( query, callback ){
		//console.log(query);
		db.getConnection(function(err, connection){
			if ( ! err )
			{
				if ( query !== undefined )
				{
					connection.query( query, function(err, rows){
						connection.release();
						
						if ( ! err )
						{
							if ( callback )
							{
								callback( err, rows );
							}
						}
					});
				}
				else
				{
					callback( err );
				}
			}
			else
			{
				throw err;
			}
		});
	};
	
	return Model;
}());