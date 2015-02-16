/*jslint white: true*/
/*global $, Handlebars, bootbox*/
var app = {
	alert	: function( message, callback ){
		'use strict';
		if ( bootbox )
		{
			bootbox.alert( message, callback );
		}
	},
	config	: {
		base_url: 'http://localhost:3000/',
		inModal	: true,
        tmplExt	: '.html'
	},
	confirm	: function( message, callback ){
		'use strict';
		if ( bootbox )
		{
			bootbox.confirm( message, callback );
		}
	},
	notifyer: {
		$elem: null,
		hideHandler: null,
		init: function( selector ){
			'use strict';
			this.$elem = $(selector);
		},
		show: function( message ){
			'use strict';
			clearTimeout( this.hideHandler );
			
			this.$elem.find('span').html( message );
			this.$elem.delay(100).fadeIn().delay(1000).fadeOut();
		}
	},
	prompt	: function( message, callback ){
		'use strict';
		if ( bootbox )
		{
			bootbox.prompt( message, callback );
		}
	},
	templateLoader: {
		templates: {},
		load: function( names, callback ){
			'use strict';
			var deffereds  = [],
				self       = this;

			Handlebars.registerHelper('xif', function(a, b, options){
				if ( a === b )
				{
					return options.fn( this );
				}
			});

			$.each(names, function(index, name){
				deffereds.push( $.get('/tmpl/' + name + app.config.tmplExt, function( data ){
					self.templates[ name ] = Handlebars.compile( data );
				}));
			});

			$.when.apply(null, deffereds).done( callback );
		},
		get: function( name, data ){
			'use strict';
			return this.templates[ name ]( data );
		}
	}
};