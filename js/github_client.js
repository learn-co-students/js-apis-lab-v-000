//define functions here


var createGist = function(file_name, content, description, token){
  var url = 'https://api.github.com/gists';

  var data = {
    'public': true,
    'description': description,
    'files': {}
  };
  data.files[file_name] = {'content': content };

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(function(response) {

    username = response.owner.login;
    myGists(username, token);
  });
};

var myGists = function (username, token){
  var url = 'https://api.github.com/users/' + username + '/gists';

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: token
    }
  }).done(function(response) {
    return response;
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').click(function(event) {
    var username = $('#username').val(), token = $('#token').val(), file_name = $('#file_name').val(),
        description = $('#description').val(), content = $('#content').val();

    createGist(file_name, content, description, token);

    var gists = myGists(username, token);

    $.each(gists, function(index, gist) {

      $('.gists').addHTML(gist);
    });
    event.preventDefault();
  });

};

$(document).ready(function(){
  bindCreateButton();
});
