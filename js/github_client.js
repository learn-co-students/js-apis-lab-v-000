//define functions here
//var token = '468ff6815f8de7ba834e3c4a98e31a654d9bd890';
//var username = 'jsgoldb';
var baseURL = 'https://api.github.com';

var createGist = function(fileName, content, description, token){
  var newObj = { public: true, description: description, files: {  }};
  newObj['files'][fileName]= {content: content};
  debugger;
  $.ajax({
    url: baseURL + '/gists',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    dataType: 'json',
    data: JSON.stringify(newObj)
  }).done(function(response) {
    username = response.owner.login;
    $('#gists').html(myGists(username, token));
  });
};

var myGists = function (username, token){

  var gists = $.ajax({
    url: baseURL + '/users/' + username + '/gists',
    type: 'GET',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    }
  });
  return gists
};

var bindCreateButton = function() {
  // call functions here
  $('button').click(function(event) {
    var fileName = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    var username = $('#username').val();
    createGist(fileName, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});
