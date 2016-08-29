//define functions here
var createGist = function(file_name, content, description, token){
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
      Authorization: "token 9e3cb4dac129eb11756de091f88dc20bc2c19cca"
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token);
  })
};


var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users" + username + "/gists",
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token 9e3cb4dac129eb11756de091f88dc20bc2c19cca"
    }
  }).done(function(response){
    $('#gists').append("<p>" + response + "</p>");
  })
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').on('click', function(){
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
