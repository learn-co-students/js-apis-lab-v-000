//define functions here
var createGist = function(file_name, content, description, token){
  var payload = {
    'public':   true,
    'description': description,
    'files': {}
  };
  payload['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(payload),
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(response) {
    var username = response.owner.login;
    myGists(username, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
  }).done(function(gists) {
    $.each(gists, function(index, gist) {
      var href = gist.html_url;
      var text = gist.description;
      $('#gist-list').append('<li><a href="' + href + '">' + text + '</a></li>');
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#button').on('click', function() {
    var token = $('#token').val();
    var file_name = $('#file').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
