//define functions here
var createGist = function(file_name, content, description, token){
//AJAX POST REQUEST - POST /gists
  var data = {
    "public": true,
    "description": description,
    "files": {}
  }
  data["files"][file_name] = {"content": content}

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: "json",
    headers: {
      Authorization: "token 9f0bcbbe9151cf483af77735ebfcc9869bbae319"
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token);
  })
};

var myGists = function (username, token){
//AJAX GET REQUEST - GET /users/:username/gists
  $.ajax({
    url: "http://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "token 9f0bcbbe9151cf483af77735ebfcc9869bbae319"
    }
  }).done(function(response){
    $('#gist-list').append("<li>" + response + "</li>");
  })
};

var bindCreateButton = function() {
  // call functions here
  $('#submit_form').on('click', function(){
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(file_name, content, description, token);
  })

};

$(document).ready(function(){
  bindCreateButton();
});
