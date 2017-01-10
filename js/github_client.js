//define functions here 6b0b977f99bac309252b65de36e423a2f30a6d99
var createGist = function(file_name, content, description, token){
  var data = {
    'public': true,
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
  }).done(function(response){
    var username = response.owner.login
    myGists(username, token)
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    }
  }).done(function(response){
    listGists(response);
  });
};

var listGists = function(gist_data){
  $.each(gist_data, function(index, gist_obj){
    $('#user-gists-list').append(gist_obj.url);
  });
};

var bindCreateButton = function() {
  $('#create-gist-link').on('click', function() {
    var token = $('#token-input').val();
    var file_name = $('#gist-filename').val();
    var description = $('#gist-description').val();
    var content = $('#gist-contents').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
