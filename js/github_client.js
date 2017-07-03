//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };
  data['files'][file_name] = {'content': content};

  $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + token);
        }
  }).done(function(resp) {
    myGists(resp.owner.login, token);
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
  }).done(function(gists) {
    $.each(gists.data, function(index, gist) {
      var mylink = $('<a>').attr('href', gist.html_url).text(gist.description);
      $('#myGists').append($('<li>').append(mylink));
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create').on('click', function() {
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
