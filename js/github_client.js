//define functions here
var createGist = function(file_name, content, description, token){
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({"description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }),
  headers: {
    Authorization: "token " + token
  }
}).done(function(postGist) {
      username = postGist["owner"]["login"];
      myGists(username, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/'+username+'/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    }
  }).done(function(gists) {
      $.each(gists, function(index, gist) {
        $('#gists').append("<li><a href=\"" +gist["html_url"]+"\">"+gist["description"]+"</a>");

      });
  });

};

var bindCreateButton = function() {
    $('#submit').on('click', function(){
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
