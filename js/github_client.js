//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'description': description,
    'public': true,
    'files': {}
  };
  data['files'][file_name] = {
    'content': content
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'token ' + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
      myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json'
}).done(function(gists) {
  $('#myGists').html('');

  $.each(gists, function(index, gist) {
    var desc = $('<li>').append(gist.description);
    $('#myGists').append(desc)
  });
})
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
