//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "files": {},
    "public" : true,
    "description": description,
  }
  data["files"][file_name] = { "content": content };

  // POST /gists
  // https://developer.github.com/v3/gists/#create-a-gist
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token);
  }).fail(function(response){
    console.log("Sad%2Trombone.wav");
  });
};

var addGistToPage = function(gist) {
  var html = '<li><a href="' + gist.html_url + '">' + gist.description + '</a></li>';
  return html;
}

var myGists = function (username, token){
  // GET /users/:username/gists
  // https://developer.github.com/v3/gists/#list-a-users-gists
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json'
  }).done(function(gists) {
    $.each(gists, function(index, gist) {
      $('#my-gists').append(addGistToPage(gist));
    });
  });
};

var bindCreateButton = function() {
  $("#create-gist").on("click", function() {
    var file_name = $("#filename").val();
    var content = $("#content").val();
    var description = $("#description").val();
    var token = $("#token").val();

    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
