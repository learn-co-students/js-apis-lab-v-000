//define functions here
var createGist = function(file_name, content, description, token){

  var dataObject = {
    "description": description,
    "public": true,
    "files": {
      file_name: {
        "content": content
      }
    }
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(dataObject),
    headers: {
      Authorization: token
    },
  }).done(function(result) {
    myGists(result, token)
  });
};

var myGists = function (username, token){
  alert("got to myGists");
  // $.ajax({
  //
  // }).done(functions(result) {
  //
  // });
};

var bindCreateButton = function() {
  // call functions here
  var file_name = $('#filename').val();
  var content = $('#content').val();
  var description = $('#description').val();
  var token = $('#token').val();
  createGist(file_name, content, description, token);

};

$(document).ready(function(){
  bindCreateButton();
});
