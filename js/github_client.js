//define functions here
var createGist = function(file_name, content, description, token){

  var data = {
    'public': true,
    'description': description,
    'files': {}
    }

    data['files'][file_name] = {'content': content}

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    authorization: `token ${token}`,
    data: JSON.stringify(data),
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){

  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
    authorization: `token ${token}`,
    success: function(response) {
      $('.gists').html('');
      $.each(response.data, function(index, gist) {
        var link = $('<a>')
          .attr('href', gist.html_url)
          .text(gist.description);
        var listItem = $('<li>')
          .append(link);
        $('.gists').append(link);
      })
    },
    error: function(response) {
      console.log("Error!");
    }
  });
};

var bindCreateButton = function() {
  $('#create-gist').on('click', function(e) {
    e.preventDefault();

    var token = $('#token').val();
    var name = $('#name').val();
    var description = $('#description').val();
    var contents = $('#contents').val();

    createGist(name, contents, description, token);
  })

};

$(document).ready(function(){
  bindCreateButton();
});
