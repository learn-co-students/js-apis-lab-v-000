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
  }).done(function(response){
    var username = response.owner.login
    myGists(username, token)
  });
};

var myGists = function (username, token){
//return a users gists
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


