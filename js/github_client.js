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
  headers: {
    Authorization: token
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
  DataType: 'json'

}).done(function(gistResponse){

  $('ol.myGists').html('');
  $.each(gistResponse.data, function(index, gist){

    var linkTag = $('<a>').attr('href', gist.html_url).text(gist.description);

    var gistHtml = $('<li>').append(linkTag);

    $('ol.myGists').append(gistHtml);
  })

});
};

var bindCreateButton = function (){
  $('#submit').click(function() {
    var username = $('#username').val();
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(file_name, content, description, token);
    myGists(username, token);
    });
  };

$(document).ready(function(){

  bindCreateButton();
});
   // Authorization: "2cf42b54bbfb9c67ac9306d1862a499a46f1efad"
