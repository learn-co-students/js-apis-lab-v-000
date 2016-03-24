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
  $.ajax({
     url: 'https://api.github.com/users/' + username + '/gists',
     type: 'GET',
     dataType: 'jsonp'
   }).done(function(gists) {
     $('#myGists').html('');
     console.log("printing gists");
 
     $.each(gists.data, function(index, gist) {
       console.log("in the iteration");
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
};

$(document).ready(function(){
  bindCreateButton();
});


//myToken = 13b5b02dbea4734dda34e57e2a6f54598e37e420