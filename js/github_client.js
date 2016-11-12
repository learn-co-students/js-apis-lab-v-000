//define functions here
var baseUrl = "https://api.github.com/";


var createGist = function(file_name, content, description, token){
  var url = baseUrl + 'gists';
  var data = {
    'description': description,
    'public': true,
    'files': {
      [file_name]: {
        'content': content
      }
    }
  }

  $.ajax({
    url: url,
    data: JSON.stringify(data),
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  var url = baseUrl + 'users/' + username + '/gists';
  var html = "<div>";

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(response) {
    $.each(response.data, function(i, gist) {
      html += '<h2>' + gist.owner.login + '</h2>';
      html += '<a href="' + gist.html_url + '">' + gist.html_url + '</a>';
      html += '</div>';
    });
    $('#myGists').html(html);
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').on('click', function(event) {
    event.preventDefault();
    var token = $('#personalToken').val();
    var fileName = $('#gistFileName').val();
    var description = $('#gistDescription').val();
    var content = $('#gistContent').val();

    createGist(fileName, content, description, token);

  });
};

$(document).ready(function(){
  bindCreateButton();
});
