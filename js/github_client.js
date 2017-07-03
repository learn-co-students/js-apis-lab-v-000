var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": description,
    "files": {}
  }

  data["files"][file_name] = {
    "content": content
  }

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: "json",
    headers: {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  })
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists/" ,
    type: "GET",
    dataType: "json",
    success: function(response) {
      $.each(response, function(index, gist) {
        $("#user-info").append("<li>" + gist.description + "</li>");
      })
    }
  })
};

var bindCreateButton = function() {
  $("#create-gist").bind("click", function() {
    var description = $("#description").val();
    var file_name = $("#file_name").val();
    var content = $("#content").val();
    var token = $("#token").val();
  })

};

$(document).ready(function(){
  bindCreateButton();
});