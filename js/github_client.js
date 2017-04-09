//define functions here
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
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
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
      var temp = "<p>" + "<a href=" + entry.html_url + ">" + gist.description + "</a>" + "</p>";
      $("#gists").append(temp);
    });
  }
});
};

var bindCreateButton = function() {
  // call functions here
  $('create').on('click', function(){
    var file_name = $("#filename").val();
    var content = $("#contents").val();
    var description = $("#description").val();
    var token = $("#token").val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
