var createGist = function(file_name, content, description, token){
  var gist = {
    'public': true,
    'description': description,
    'files': {}
  };

  gist.files[file_name] = {"content": content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + token
    },
    data: JSON.stringify(gist)
  }).done(function(response) {
    console.log('createGist response: ' + response);
    myGists(response.owner.login, token);
  });

};

var myGists = function(username, token) {
  $.ajax({
    dataType: 'json',
    url: 'https://api.github.com/users/' + username + '/gists',
    success: function(gists) {
      console.log('myGists response: ' + gists);

      $('#gist-list').show();
      $('#gist-list').html('<h2>Your Gists</h2>');

      $.each(gists, function(index, gist) {
        var link = gist.html_url;
        var text = gist.description;

        $('#gist-list').append('<li><a href="' + link + '">' + text + '</a></li>');
      });
    },
    error: function() {
      alert('There was an error with the request. Please try again.');
    }
  });
};

var bindCreateButton = function() {
  $('#create').on('click', function() {

    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    // console.log(`These values were sent to createGist function: token = ${token}, file_name = ${file_name}, description = ${description}, and contents = ${contents}`);

    createGist(token, file_name, description, contents);
  });
};

$(document).ready(function() {
  bindCreateButton();
});
