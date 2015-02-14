$(document).ready(function(){
   Handlebars.registerHelper('xif', function(a, b, options){
        if ( a === b )
        {
            return options.fn( this );
        }
    });

    app.notifyer.init({
        "selector": ".bb-alert"
    });

    var templates = {};

    $.each(['modal','updateUser','addUser'], function(i, name){
        $.get('/tmpl/' + name + '.html', function( data ){
            templates[ name ] = Handlebars.compile( data );
        });
    });

    $('.lastname').on('click', function(){
        $.ajax({
            url		: './users/user/' + $(this).data('id'),
            type	: 'GET',
            success	: function( rs ){
                $('.modal-dialog').empty().append( templates.modal( rs[0] ) );
                $('.modal').modal();
            }
        });
    });

    $('.delete').on('click', function(e){
        e.preventDefault();
        var $self	= $(this),
            id		= $(this).data('user-id');

        bootbox.confirm("Voulez-vous supprimer cet employé?", function(result) {
            if ( result )
            {
                $.ajax({
                    url		: './users/delete/' + id,
                    type	: 'DELETE',
                    success	: function( rs ){
                        if ( rs.success )
                        {
                            $self.closest('tr').remove();
                        }
                    }
                });
            }
        });
    });

    $('.update').on('click', function(e){
        e.preventDefault();
        var $self	= $(this),
            id		= $(this).data('user-id');

        $.ajax({
            url		: './users/user/' + $(this).data('user-id'),
            type	: 'GET',
            success	: function( rs ){
                $('.modal-dialog').empty().append( templates.updateUser( rs[0] ) );
                $('.modal').modal();
            }
        });
    });
    
    $('#add-user').on('click', function(e){
        e.preventDefault();
        
        $('.modal-dialog').empty().append( templates.addUser( ) );
        $('.modal').modal();
    });
});

app.test = function(){
    var $form = $(document.userform);

    $.ajax({
        type	: 'PUT',
        dataType: 'json',
        url		: './users/update/',
        data	: $form.serialize(),
        success	: function( r ){
            if ( r.success === true )
            {
                $('.modal').modal('hide');
                app.notifyer.show('Mise à jour effectuée');
            }
        }
    });
};

app.add = function(){
   //e.preventDefault();
		
    var $form = $(document.userform),
        $data = $form.serialize();

    $.ajax({
        type	: 'POST',
        dataType: 'json',
        url		: './users/add/',
        data	: $data,
        success	: function( r ){
            console.log(r);
            $form.trigger('reset');
        }
    });
};