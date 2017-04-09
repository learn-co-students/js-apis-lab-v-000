var createGist = function(file_name, content, description, token){
   var data = {
    "description": description,
    "public": true,
    "files":{}
    }

    data.files[file_name] = {"content" : content}

  $.ajax({
     url: 'https://api.github.com/gists',
     type: 'POST',
     dataType: 'json',
     headers: {
       Authorization: 'token ' + token
     },
     data: JSON.stringify(data)
   }).done(function(response){
     myGists(response.owner.login, token);
  });

};


var myGists = function (username, token){
   $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "jsonp"
  }).success(function(gists) {
    listGists(gists);
  });
};

var listGists = function(gists) {
  $.each(gists, function(index, gist) {
    $("#myGists").append("<li>" + gist + "/li>");
  });
};

var bindCreateButton = function() {
  $("#create").click(function() {
    var token = $("#token").val();
    var fileName = $("#file-name").val();
    var content = $("#content").val();
    var description = $("#description").val();
    createGists(fileName, content, description, token);
  })

};

$(document).ready(function(){
  bindCreateButton();
});
