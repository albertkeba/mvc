/*jslint white: true, devel: true*/
/*global require, module*/
var BaseController = require('../system/core/controller');

module.exports = BaseController.extend({
	name: 'Home',
	content: null,
	run: function( req, res, next ){
		'use strict';
		res.render('home', {title: 'Repertoire de contacts'});
	},
	getContent: function(){
		'use strict';
	}
});