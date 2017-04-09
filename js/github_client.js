//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "description": description,
    "public": true,
    "files": {}
  };
  data.files[file_name] = {
    "content": content
  };
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $('#gists-list').html('');
  var ajaxRequest = {
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json'
  };
  if (token !== '') {
    ajaxRequest.headers = {Authorization: `token ${token}`};
  }
  $.ajax(ajaxRequest).done(function(gists) {
    $.each(gists, function(index, gist) {
      $('#gists-list').append(`<li><a href="${gist.html_url}">${Object.keys(gist.files)[0]}</a></li>`);
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#createGist').click(function() {
    createGist($('#filename').val(), $('#content').val(), $('#description').val(), $('#token').val());
  });
};

$(document).ready(function(){
  bindCreateButton();
  $('#displayGists').click(function() {
    myGists($('#username').val(), $('#token').val());
  });
});
