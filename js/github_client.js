'use strict';

//define functions here
var createGist = function(file_name, content, description, token){
  var files = {};
  files[file_name] = {"content": content};
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify({ public : true, description : description, files : files}),
  }).done(function(response) {
      myGists(response.owner.login, token);
  });

};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $.each(result, function(index, gist) {
        $("#user-info").append('<li>' + gist.description + '</li>');
      })
    }
  })
};

var bindCreateButton = function() {
  // call functions here
  $('#create-gist').click(function(event) {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
  myGists('mcglaser', token);
});
