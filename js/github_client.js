//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
     'public':   true,
     'description': description,
     'files': {}
   };

   data['files'][file_name] = {
     'content': content
   };

   $.ajax({
     url: 'https://api.github.com/gists',
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(data)
   }).done(function(response) {
     myGists(response.owner.login, token);
   });
};

var myGists = function (username, token){
    // var token = "b8ada542e63077c79f0e84bd0523695e0ef406ca"
    // var username = "jasonpaulso"
  $.ajax({
     url: 'https://api.github.com/users/' + username + '/gists',
     type: 'GET',
     dataType: 'jsonp',
     headers: {
           Authorization: 'token ' + token
         }
   }).done(function(gists) {
     $('#gists').html('');
     $.each(gists.data, function(index, gist) {
       var link = $('<a>').attr('href', gist.html_url).text(gist.description);
       var listItem = $('<li>').append(link);
       $('#gists').append(listItem);
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
};

$(document).ready(function(){
  bindCreateButton();
});
