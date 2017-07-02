
var createGist = function(file_name, content, description, token){

  var data = {
    'public': true,
    'description' : description,
    'files' : {}
  };

  data['files'][file_name] = {
    "content": content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  }).error( function(e) {
    console.warn("gist save error", e);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/gists/' + username + '/gist',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#myGists').html('');
    $.each(gists.data, function(index, gist) {

      var anchor = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);

      var listItem = $('<li>')
        .append(link);

      $('#myGists').append(listItem);
    });
  });
};

var bindCreateButton = function() {
  $('#create').click(function() {
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


//var token = 31ccd2c89b8f8afba9d0b7a6a738fe5ba5f96bf3;
