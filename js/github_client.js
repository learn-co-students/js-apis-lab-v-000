//define functions here
function createGist(file_name, content, description, token) {
  var gistData = {
    'public': true,
    'description': description,
    'files': {}
  }
  gistData['files'][file_name] = {'content': content}

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    data: JSON.stringify(gistData),
    headers: {
      Authorization: `token ${token}`
    }
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
}

function myGists(username, token) {
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    headers: {
      Authorization: `token ${token}`
    }
  }).done(function(gists) {
    $.each(gists, function(index, gist) {
      $('#myGists').append($(`<li><a href="${gist.html_url}">${gist.description}</a></li>`));
    });
  });
};

function bindCreateButton() {
  // call functions here
  $('#create').click(function() {
    createGist(
      $('#file_name').val(),
      $('#content').val(),
      $('#description').val(),
      $('#token').val()
      );
  });
};

$(document).ready(function(){
  bindCreateButton();
});
