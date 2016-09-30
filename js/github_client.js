//define functions here
var createGist = function(file_name, content, description, token){
  var gist_obj = {
    "public": true,
    "description": description,
    "files": {}
  };

  gist_obj["files"][file_name] = {"content": content};

  $.ajax({ 
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(gist_obj)
  }).done(function(response){
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  var url = "https://api.github.com/users/" + username + "/gists/";
  var myGs = $.ajax({ 
    url: url,
    type: "GET",
    dataType: 'jsonp',
  }).done(function(new_gist){
    $('#myGs').html(new_gist)
  });
};

var bindCreateButton = function() {
  var token = $('#token').val();
  var filename = $('#filename').val();
  var description = $('#description').val();
  var content = $('#content').val();
  createGist(filename, content, description, token)
};

$(document).ready(function(){
});
