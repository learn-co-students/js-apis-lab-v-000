var createGist = function(file_name, content, description, token){
  var newToken = "token " + token
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
    headers: {"Authorization": newToken},
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var bindCreateButton = function() {
  $('#create').click(function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    createGist(file_name, content, description, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json'
  }).done(function(response) {
    $('#myGists').html();
    $.each(response.data, function(index, gist) {
      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);
      var listItem = $('<li>')
        .append(link);
      $('#myGists').append(listItem);
    })
  });
};


$(document).ready(function(){
  bindCreateButton();
});
