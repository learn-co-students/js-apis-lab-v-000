//define functions here
var createGist = function(file_name, content, description, token){
  var url = 'https://api.github.com/gists'

  var data = {
    'public':   true,
    'description': description,
    'files': {
      [file_name]: {
        'content': content
      }
    }
  }

  $.ajax( {
    type: 'POST',
    url: url,
    data: ( JSON.stringify( data ) ),
    dataType: 'json',
  } );
};

var myGists = function (username, token){
  $.ajax( {
    
  } );
  console.log(username + token);
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
