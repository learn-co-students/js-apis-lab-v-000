var createGist = function( file_name, content, description, token ) {
  var url = 'https://api.github.com/gists'

  var data = {
    'public':   true,
    'description': description,
    'files': {
      [ file_name ]: {
        'content': content
      }
    }
  }

  $.ajax( {
    type: 'POST',
    url: url,
    data: ( JSON.stringify( data ) ),
    headers: {
      'Authorization': token
    },
    dataType: 'json',
  } );
  myGists( 'fake login', token );
  // myGists( 'genericlady', token );
};

var myGists = function( username, token ) {
  var githubURL = 'https://api.github.com/users/' + username + '/gists'

  $.ajax( {
    url: githubURL,
    type: 'GET',
    dataType: 'JSON',
    headers: {
      'Authorization': token
    },
    success: function( response ) {
      console.log( response );
    }
  } );
};

var bindCreateButton = function() {
  var newGistParameters = {};

  $( 'button' ).on( 'click', function( event ) {
    var fields = $( ':input' ).serializeArray();

    jQuery.each( fields, function( i, field ) {
      newGistParameters[ field[ 'name' ] ] = field[ 'value' ];
    } )
    createGist( newGistParameters );
    event.preventDefault();

  } );
};

$( document ).ready( function() {
  bindCreateButton();
} );
