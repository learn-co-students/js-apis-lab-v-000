
var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "token " + token
    }
  }).done(function(gists) {
    $("#public-gists").html("");

    $.each(gists, function(index, gist) {
      var link = $("<a>")
        .attr("href", gist.html_url)
        .text(gist.description);

      var listItem = $("<li>").append(link);

      $("#public-gists").append(listItem);
    });
  });
};

var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": description,
    "files": {}
  };
  data.files[file_name] = {
    "content": content
  };
  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var bindCreateButton = function() {
  $("#create-gist").click(function(event) {
    var file_name = $("#file-name").val();
    var content = $("#content").val();
    var description = $("#description").val();
    var token = $("#token").val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
