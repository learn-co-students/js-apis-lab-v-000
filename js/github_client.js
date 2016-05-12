//var token = e5c9cc3828f5366e909fc4934544844302981881;

var createGist = function(file_name, content, description, token){

  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };

  data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    data: JSON.stringify(data),
    dataType: 'json',
    headers: {
      Authorization: "e5c9cc3828f5366e909fc4934544844302981881"
    }
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
}

var myGists = function(username, token){
  $.ajax({
    url: "https://api.github.com//users/" + username + "/gists",
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gist) {
    $("#gist-results").append(gist);
  });
}

var bindCreateButton = function() {
  $("#gistme").click(function() {
    var file_name = $("#file_name").val();
    var content = $("#content").val();
    var description = $("#description").val();
    var token = $("#token").val();
    createGist(file_name, content, description, token);
  });
}

$(document).ready(function(){
  bindCreateButton();
});
