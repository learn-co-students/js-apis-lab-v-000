//define functions here
var createGist = function(file_name, content, description, token){
  var gistData = {
    'public': true,
    'description': description, 
    'files': {}
  };
  gistData['files'][file_name] = { content: content };

$.ajax({
  url: 'https://api.github.com/gists',
  type: 'POST',
  DataType: 'json',
  beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    }, 
  data: JSON.stringify(gistData)
}).done(function(response){
  myGists(response.owner.login, token);
});

};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' +username+ '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gistResponse){
  $('ol.myGists').html('');

  $.each(gistResponse.data, function(index, gist){

    var link = $('<a>').attr('href', gist.html_url).text(gist.description);

    var listItem = $('<li>').append(link);

    $('ol.myGists').append(listItem);
  })

});
};

var bindCreateButton = function (){
  $('#createGist').submit(function(event) {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    event.preventDefault();
    createGist(file_name, content, description, token);
    });
  };

$(document).ready(function(){

  bindCreateButton();
});
