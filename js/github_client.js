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
    error: function(e) {
      console.log(e)
    }
  }).done(function(data){
      console.log('successfully created');
      myGists(data['owner']['login'], token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    error: function (error) {
      console.log('error');
    }
    }).done(function(response) {
      console.log('gists acquired');
      buildGists(response);
    });
};

var buildGists = function(json) {
  var html = "";
  for (i in json) {
    console.log(json[i]['description']);
    html += '<p>' + json[i]['description'] + '</p>';
  }
  $('#gists').html(html);
}

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
  bindCreateButton();
});
