//define functions here
var createGist = function(file_name, content, description, token){
  var params = {
    'public': true,
    'description': description,
    'files': {
    }
  }

  params['files'][file_name] = {
    "content": content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    data: JSON.stringify(params),
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'token ' + token);
    }
  }).done(function(response) {
    myGists(response.owner.login, token)
  });
}

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'token ' + token);
    }
  }).done(function(gists) {

  $.each(gists.data, function(index, gist) {
    var link = $('<a>')
      .attr('href', gist.html_url)
      .text(gist.description);

    var listItem = $('<li>')
      .append(link);

    $('#my_gist').append(listItem);
    })
  });
}

var bindCreateButton = function() {
  // call functions here
  $('form').on('submit', function(event){
    var file_name = $('#file_name').val()
    var content = $('#contents').val()
    var description = $('#description').val()
    var token = $('#token').val()

    createGist(file_name, content, description, token)
    event.preventDefault();
  })
};

$(document).ready(function(){
  bindCreateButton()
});
