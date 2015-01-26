/*jslint white: true, nomen: true*/
/*global require, module*/
var _ = require('underscore');

module.exports = {
	name: 'base',
	extend: function ( child ) {
		'use strict';
		return _.extend({}, this, child);
	},
	run: function ( req, res, next ) {
		'use strict';
	}
};