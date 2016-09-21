//define functions here
var tkn = "a3bef0996a87cd2aa8db7ec6ffb80adb13a0671c"

var createGist = function(file_name, content, description, token){
  var files = {[file_name] : {'content': content}}
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({'public': true, 'description': description, files }),
    headers: {
      Authorization: token
    }
  }).done(function(response) {
   myGists(response.owner.login, token);
 });
};


var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#myGists').html('');

    $.each(gists.data, function(index, gist) {
      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);

      var listItem = $('<li>')
        .append(link);

      $('#myGists').append(listItem);
    })
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
}

$(document).ready(function(){
  bindCreateButton();
});
