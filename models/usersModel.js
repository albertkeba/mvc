/*global require, module*/
var BaseModel = require('../system/core/model');

module.exports = (function(){
	'use strict';
	
	function usersModel(){}
	
	usersModel.prototype = Object.create( BaseModel.prototype );
	
	usersModel.prototype.getUsers = function( callback ){
		this.select("SELECT * FROM employees", function( err, rows ){
			if ( callback )
			{
				callback( rows );
			}
		});
	};
	
	usersModel.prototype.getUser = function( id, callback ){
		
		this.select("SELECT * FROM employees WHERE id = " + id, function( err, rows ){
			if ( callback )
			{
				callback( rows[0] );
			}
		})
	};
	
	return usersModel;
}());	