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
	
	/**
	 * affiche la liste des employes
	 */
	UsersController.prototype.all = function( req, res, next ){
		if ( req.method === 'GET' )
		{
			new UserModel().getUsers(function( employees ){
				res.render('users', {
					styles: ['widgets'],
                    scripts: ['handlebars.min'],
					title: 'Repertoire de contacts', 
					employees: employees
				});
			});
		}
	};
	//-- eo users
	
	/**
	 * affiche un employe
	 */
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
        }
	};
	//-- eo user
	
	UsersController.prototype.adduser = function( req, res, next ){
		res.render('userform', {title: 'add user'});
	};
	
	/**
	 * ajout d'un nouvel employee
	 */
	UsersController.prototype.add = function( req, res, next ){
		if ( req.method === 'POST' && req.xhr )
		{			
			new UserModel().addUser(req.body, function( result ){
				if ( result.success )
				{
					res.status(201).json( result );
				}
			});	
		}
	};
	//-- add
	
	UsersController.prototype.deleteUser = function( req, res, next ){
		//console.log(req.method); DELETE
		//res.sendStatus(200)
	};
	
	return UsersController;
}());