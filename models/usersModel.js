/*jslint white:true*/
/*global require, module*/
var BaseModel = require('../system/core/model');

module.exports = (function(){
	'use strict';
	
	function UsersModel(){}
	
	UsersModel.prototype = Object.create( BaseModel.prototype );
	
	UsersModel.prototype.getUsers = function( callback ){
		if ( callback )
		{
			this.select( "SELECT * FROM employees", callback );
		}
	};
	
	UsersModel.prototype.getUser = function( id, callback ){
		if ( callback )
		{
			this.select( "SELECT * FROM employees WHERE id = " + id, callback );
		}
	};
	
	UsersModel.prototype.addUser = function( post, callback ){
		if ( callback )
		{
			this.insert("INSERT INTO employees SET ?", post, callback);
		}
	};
	
	UsersModel.prototype.deleteUser = function( callback ){};
	
	return UsersModel;
}());	