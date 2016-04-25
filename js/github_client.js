//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {"content": content}
    }
  };

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    headers: {
      Authorization: token,
    },
    data: JSON.stringify(data)

  }).done(function(response){
    myGists(response["owner"]["login"], token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users" + username + "/gists",
    type: "GET",
    dataType: "jsonp",
    headers: {
      Authorization: token
    }

  }).done(function(gists){
    $("#display_gists").append(gists);
    return gists;

  }).fail(function(error){
    console.log("Something went wrong: " + error);
  });
};

var bindCreateButton = function() {
  // call functions here
  var token = $("#personal_token").val();
  var description = $("#gist_description").val();
  var filename = $("#gist_filename").val();
  var contents = $("#gist_contents").val();

  createGist(filename, contents, description, token);

};

$(document).ready(function(){
  bindCreateButton();
});
