//define functions here
var createGist = function(file_name, content, description, token){
  var gist = {
    'description': description,
    'public': true,
    'files': {}
  };

  gist['files'][file_name] = { 'content': content }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: { Authorization: token },
    data: JSON.stringify(gist)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(response) {
    //format into list and append html to index
    $('#userGists');

    var html = '<ul>';

    $.each(response.data, function(index, gist) {
      html += '<li><a href=' + gist.html_url + '>' + gist.description + '</a></li>';
    })

    html += '</ul>';
  });

  $('#gists').append(html);
};

var bindCreateButton = function() {
  // call functions here
  $('#create').on('click', function() {
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();

    createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton
});
