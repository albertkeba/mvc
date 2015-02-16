/*jslint white:true*/
/*global $,app*/
var base_url = app.config.base_url + 'users/';

$(document).ready(function(){
    'use strict';
    app.templateLoader.load(['modal','updateUser','addUser']);
    app.notifyer.init('.bb-alert');
	
	/* consulter les infos d'un employé */
	$('.lastname, .firstname').on('click', function(){
		if ( app.config.inModal )
		{
			app.user.get( $(this).data('id') );
		}
		else
		{
			window.location = base_url + 'user/' + $(this).data('id');
		}
	});
	
	/* suppression d'un employé */
	$('.delete').on('click', function(e){
		e.preventDefault();
		var $self	= $(this),
			id		= $(this).data('user-id');
		
		app.confirm('Voulez-vous supprimer cet employé?', function( result ){
			if ( result )
			{
				app.user.del( id, $self.closest('tr') );
			}
		});
	});
	
	/* mettre à jour un employée */
	$('.update').on('click', function(e){
		e.preventDefault();
        var $self	= $(this),
            id		= $(this).data('user-id');
		
		$.ajax({
            url		: base_url + 'user/' + id,
            type	: 'GET',
            success	: function( rs ){
                $('.modal-dialog').empty().append( app.templateLoader.get('updateUser', rs[0] ));
                $('.modal').modal();
            }
        });
	});
	
	/* ajouter un nouvel employé*/
	$('#add-user').on('click', function(e){
        e.preventDefault();
        
        $('.modal-dialog').empty().append( app.templateLoader.get('addUser') );
        $('.modal').modal();
    });
});

app.user = {
	add: function(){
		'use strict';
		var $form = $(document.userform),
			$data = $form.serialize();

		$.ajax({
			type	: 'POST',
			dataType: 'json',
			url		: base_url + 'add/',
			data	: $data,
			success	: function( r ){
				//console.log(r);
				$form.trigger('reset');
			}
		});
	},
	del: function( id, $parent ){
		'use strict';
		$.ajax({
			url		: base_url + 'delete/' + id,
			type	: 'DELETE',
			success	: function( rs ){
				if ( rs.success )
				{
					$parent.remove();
					app.notifyer.show('Suppression effectuée');
				}
			}
		});
	},
	get: function( id ){
		'use strict';
		$.ajax({
			url		: base_url + 'user/' + id,
			type	: 'GET',
			success	: function( rs ){
				$('.modal-dialog').empty().append( app.templateLoader.get('modal', rs[0]) );
				$('.modal').modal();
			}
		});
	},
	update: function(){
		'use strict';
		var $form = $(document.userform);

		$.ajax({
			type	: 'PUT',
			dataType: 'json',
			url		: base_url + 'update/',
			data	: $form.serialize(),
			success	: function( r ){
				if ( r.success === true )
				{
					$('.modal').modal('hide');
					app.notifyer.show('Mise à jour effectuée');
				}
			}
		});
	}
};