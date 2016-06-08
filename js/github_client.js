//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "description": description,
    "public": true,
    "files": {}
  };
  data['files'][file_name] = {'content':content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers:{
      Authorization: 'token ' + token
    }
  }).done(function(newGist) {
    myGists(newGist.owner.login, token);
  });
};

var myGists = function (username, token){
  $ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "jsonp"
  }).success(function(gists) {
    listGists(gists);
  });
};

var listGists = function(gists) {
  $.each(gists, function(index, gist) {
    $("#myGists").append("<li>" + gist + "</li>");
  });
};

var bindCreateButton = function() {
  // call functions here
  $("create").click(function() {
    var token = $("token").val();
    var fileName = $("#file-name").val();
    var content = $("#content").val();
    var description = $("#description").val();
    createGist(fileName, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});


