//define functions here
var createGist = function(file_name, content, description, token){
  var gists = {
    "public": true,
    "description": description,
    "files": {}
  }

  gists["files"][file_name] = {"content": content};

  $.ajax({
    url: "https://api.github.com/gists",
    type: 'POST',
    data: JSON.stringify(gists),
    dataType: 'json',
    headers: {
      Authorization: token
    }
  }).done(function(response){
    myGists(response.owner.login, token)
  })
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/gists/" + username + "/gists",
    type: "GET",
    data: data,
    success: success,
    dataType: dataType,
    headers: {
       Authorization: token
    }
  }).done(function(gists){
    $.each(gists.data, function(index, gist) {
       var url = $('<a>').attr('href', gist.html_url);
       url.text(gist.description);
       $('#gists').append($('<p>').append(url));
     }) 
   })
};

var bindCreateButton = function() {
  $('#create').click(function() {
     var token = $('#token').val();
     var file_name = $('#filename').val();
     var content = $('#content').val();
     var description = $('#description').val();
        
     createGist(file_name, content, description, token);
   });
};

$(document).ready(function(){
  bindCreateButton();
});
