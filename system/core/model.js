/*jslint devel: true, white: true*/
/*global require,module*/
var db = require('../../config/db');

module.exports = (function(){
	'use strict';
	
	function Model(){}
	
	Model.prototype.query = function( query, callback, data ){
		db.getConnection(function(err, connection){
			connection.query( query, data, function( err, result ){
				connection.release();
				
				if ( ! err && query && callback )
				{
					callback( err, result );
				}
				else
				{
					throw err;
				}
			});
		});
	};
	
	Model.prototype.select = function( query, callback ){
		this.query( query, function( err, result ){
			if ( result.length > 0 )
			{
				callback( result );
			}
		});
	};
	
	Model.prototype.insert = function( query, callback, post ){
        console.log(query);
		this.query( query, function( err, result ){
			if ( ! err )
			{
				callback({
					success : true,
					insertId: result.insertId
				});
			}
		}, post);
	};
	
	Model.prototype.delete = function( query, callback, id){
		this.query( query, function( err, result ){
			if ( ! err )
			{
				callback({
					success: true
				});
			}
		}, [id]);
	};
    
    Model.prototype.update = function( query, callback, post ){
        this.query( query, function( err, result ){
            if ( ! err )
            {
                callback({
					success: true
				});
            }
        }, post);
    };
	
	return Model;
}());