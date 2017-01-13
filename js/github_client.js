//define functions here
var createGist = function(file_name, content, description, token){
  var gist = {
    'public': true,
    'description': description,
    'files': {}
  };

  gist.files[file_name] = {'content': content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    },
    data: JSON.stringify(gist)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github/com/users/' + username + '/gists/',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      $.each(response, function(index, gist) {
        $('#user_info').append('<li>' + gist.description + '</li>');
      });
    },
    error: function() {
      alert('There was an error with the request. Please try again.');
    }
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create-gist').bind('click', function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();
  });
};

$(document).ready(function(){
  bindCreateButton();
});
