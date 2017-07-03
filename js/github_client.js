//define functions here
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
    }).done(function(response) {
      myGists(response.owner.login, token);
    });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#myGists').html('');
    $.each(gists.data, function(index, gist) {
      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);
      var listItem = $('<li>')
        .append(link);
      $('#myGists').append(listItem);
    })
  });
};

var bindCreateButton = function() {
  $('#submit').click(function() {
    filename = $('#filename').val();
    content = $('#contents').val();
    description = $('#description').val();
    token = $('#token').val();
    createGist(filename, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});