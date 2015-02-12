/*jslint white: true, devel: true*/
/*global require, module*/
/*
http://esa-matti.suuronen.org/blog/2013/04/15/asynchronous-module-loading-with-browserify/
http://putaindecode.fr/posts/js/browserify-all-the-things/
*/
var Controller = require('../system/core/controller'),
	UserModel = require('../models/usersModel');

module.exports = (function(){
	'use strict';
	
	function UsersController(){}
	
	UsersController.prototype = Object.create( Controller.prototype );
		
	UsersController.prototype.index = function( req, res, next ){
		this.all( req, res, next );
	};
	
	UsersController.prototype.all = function( req, res, next ){
		if ( req.method === 'GET' )
		{
			new UserModel().getUsers(function( employees ){
				res.render('users', {
					styles: ['widgets'],
                    scripts: ['handlebars.min','bootbox.min'],
					title: 'Repertoire de contacts', 
					employees: employees
				});
			});
		}
	};
	
	UsersController.prototype.user = function( req, res, next, id ){
        if ( req.method === 'GET' )
        {
            new UserModel().getUser(id, function( result ){
                if ( req.xhr )
                {
                    res.send( result );
                }
                else
                {
                    result = result[0];
                    res.json(result);
                }
            });
        }
	};
	
	UsersController.prototype.adduser = function( req, res, next ){
		res.render('userform', {title: 'add user'});
	};
	
	UsersController.prototype.add = function( req, res, next ){
		if ( req.method === 'POST' && req.xhr )
		{			
			new UserModel().addUser(req.body, function( result ){
				console.log(result);
				if ( result.success )
				{
					res.status(201).json( result );
				}
			});	
		}
	};
	
	UsersController.prototype.delete = function( req, res, next, id ){
		if ( req.method === 'DELETE' && req.xhr )
		{
			new UserModel().deleteUser(id, function( result ){
				if ( result.success )
				{
					res.status(201).json( result );
				}
			});
		}
	};
	
	return UsersController;
}());