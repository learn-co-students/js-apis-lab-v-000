//define functions here
var createGist = function(file_name, content, description, token) {
  data = {
    "public": true,
    "description": description,
     "files": {}
  }
  data["files"][file_name] = { "content" : content }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
}

var myGists = function (username, token) {
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
  }).done(function(response) {
    $('#gists').html('');
    $.each(response.data, function(index, gist) {
      ($('<li>').add($('<a>', {
        text: gist.description,
        href: gist.html_url
      }))).appendTo($('#gists'));
    });
  });
}

var bindCreateButton = function() {
  $('#create').on('click', function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
