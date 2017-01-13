//define functions here
var createGist = function(file_name, content, description, token){
  var body = {
    'description': description,
    'public': true,
    'files': {}
  }
  body['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(body),
    headers: {
      Authorization: "token " + token
    }
  }).done(function(gist) {
    myGists(gist.owner.login, token)
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    }
  });
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
