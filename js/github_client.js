var createGist = function(file_name, content, description, token){
  var gistData = {
    "public": true,
    "description": description,
    "files": {}
  };
  gistData["files"][file_name] = { "content": content };
  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    data: JSON.stringify(gistData),
    dataType: "json",
    headers: {
      Authorization: "token " + token
    }
  }).done(function(response) {
    myGists(response.owner.login, token);
  });

};

var displayGists = function(gists) {
  $.each(gists, function(index, gist) {
    $("#myGists").append("<li>" + gist + "/li>");
  });
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "jsonp"
  }).done(function(gists) {
    displayGists(gists);
  });
};

var bindCreateButton = function() {
  $("#create").click(function() {
    var file_name = $("#file_name").val();
    var content = $("#content").val();
    var description = $("#description").val();
    var token = $("token").val();
    createGists(file_name, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});
