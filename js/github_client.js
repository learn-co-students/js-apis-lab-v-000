//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "files": {},
    "description": description,
    "public": true
  }

  data.files[file_name] = {
    "content": content
  };

  $.ajax({
    type: 'POST',
    url: 'https://api.github.com/gists',
    dataType: 'json',
    headers: {
      Authorization: 'token'
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });

};

var myGists = function (username, token){
  $.ajax({
    type: 'GET',
    url: "https://api.github.com/users/" + username + "/gists",
    dataType: 'json',
    success: function(data) {
      data.forEach(function(gist) {
        var str = "<p>" + "<a href=" + entry.html_url + ">" + gist.description + "</a>" + "</p>";
        $("h2").append(str);
      });
    }
  });
};

var bindCreateButton = function() {
  // call functions here
  $("#submit").on("click", function() {
    var token = $("#token").val();
    var fileName = $("#name").val();
    var description = $("#description").val();
    var contents = $("#contents").val();
    createGist(token, fileName, description, contents);
  });
};

$(document).ready(function(){
  bindCreateButton();
});

