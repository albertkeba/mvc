/*jslint white: true, nomen: true, devel: true*/
/*global require, module*/
module.exports = (function(){
	'use strict';
	
	function Controller(){}
	
	Controller.prototype.run = function( req, res, next, m, p ){
		if ( m === undefined )
		{
			this.index( req, res, next );
		}
		else
		{
			if ( typeof this[m] === 'function' )
			{
				this[m]( req, res, next, p );
			}
			else
			{
				this.index( req, res, next );
			}
		}
	};
	
	return Controller;
}());