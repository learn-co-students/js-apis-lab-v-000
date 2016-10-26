//define functions here
var createGist = function(file_name, content, description, token){
  var githubInput = {
    'public': true,
    'description': description,
    'files': {}
  };
  githubInput['files'][file_name] = {
    'content': content
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    datatype: 'json',
    data: JSON.stringify(githubInput),
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(response) {
    var username = response.owner.login;
    myGists(username, token);
  });
};

var myGists = function (username, token) {
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataype: 'json',
  }).done(function(gists) {
    $.each(gists, function(index, gist) {
      var href = gist.html_url;
      var desc = gist.description;
      $('#results').append('<li><a href="' + href + '">' + desc + '</a></li>');
    });
  });
};

var bindCreateButton = function() {
  $('#create').on('click', function() {
    var token = $('#token').val();
    var gistName = $('#gistName').val();
    var gistDescription = $('#gistDescription').val();
    var gistContents = $('#gistContents').val();
    createGist(gistName, gistContents, gistDescription, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});


// Personal token:
// 0f67a2c1f8d115a6e431acd0888ce902a5fc8615
