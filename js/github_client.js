// https://api.github.com/users/reichardn/gists
// https://api.github.com/gists
//define functions here


var createGist = function(file_name, content, description, token){
  var dataObj = { 
        'description': description, 
        'public': true,
        'files': {
          file_name: {
            'content': content
          }
        }
      };
  var data = JSON.stringify(dataObj);

  $.ajax({
    type: 'POST',
    url: 'https://api.github.com/gists',
    data: data,
    headers: {
      Authorization: `token ${token}`
    },
    success: function(msg){
      console.log('successfully created');
    },
    error: function(e) {
      console.log(e)
    }
  });

};

var myGists = function (username, token){
  var json;
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    async: false,
    headers: {
      Authorization: `token ${token}`
    },
    success: function(response) {
      json = response;
    },
    error: function (error) {
      console.log('error');
    }
  });
  return json;
};

var bindCreateButton = function() {
  // call functions here
  // file_name, content, description, token
  $('#create-button').on('click', function() {
    var file_name = $('#file-name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(file_name, content, description, token);

  })

};

$(document).ready(function(){
});
