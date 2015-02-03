/*jslint white: true, devel: true*/
/*global require, module*/
var Controller = require('../system/core/controller'),
	UserModel = require('../models/usersModel');

module.exports = (function(){
	'use strict';
	
	function UsersController(){}
	
	UsersController.prototype = Object.create( Controller.prototype );
		
	UsersController.prototype.index = function( req, res, next ){
		this.all( req, res, next );
	};
	
	/**
	 * affiche la liste des employes
	 */
	UsersController.prototype.all = function( req, res, next ){
		new UserModel().getUsers(function( employees ){
			res.render('users', {
				title: 'Repertoire de contacts', 
				employees: employees
			});
		});
	};
	//-- eo users
	
	/**
	 * affiche un employe
	 */
	UsersController.prototype.user = function( req, res, next, id ){
		new UserModel().getUser(id, function( result ){
			if ( req.xhr )
			{
				res.send( result );
			}
			else
			{
				res.render('user', {
					title: result.firstName + ' ' + result.lastName,
					employee: {
						imgsrc		: (result.firstName).toLowerCase() + '_' + (result.lastName).toLowerCase(),
						firstname	: result.firstName,
						lastname	: result.lastName,
						department	: result.department
					}
				});
			}
		});
	};
	//-- eo user
	
	return UsersController;
}());