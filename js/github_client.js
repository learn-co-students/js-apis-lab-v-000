//define functions here
var createGist = function(file_name, content, description, token){

  var dataObject = {
    "description": description,
    "public": true,
    "files": {}
  };
  dataObject["files"][file_name] = {"content": content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(dataObject),
    headers: {
      Authorization: token
    }
  }).done(function(result) {
    myGists(result.owner.login, token)
  });
};

var myGists = function (username, token){
  $.ajax({
   url: 'https://api.github.com/users/' + username + '/gists',
   type: 'GET',
   dataType: 'jsonp'
  }).done(function(results) {
    $('#myGists').html('');

    $.each(results.data, function(index, result) {
      var link = $('<a>')
        .attr('href', result.html_url)
        .text(result.description);

      var listItem = $('<li>')
        .append(link);
      $('#myGists').append(listItem);
    });
  });
};



var bindCreateButton = function() {
  // call functions here
  $('#create').click(function() {
  var file_name = $('#filename').val();
  var content = $('#content').val();
  var description = $('#description').val();
  var token = $('#token').val();
  createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
