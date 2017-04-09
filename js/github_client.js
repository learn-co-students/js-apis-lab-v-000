//define functions here


var baseUrl = "https://api.github.com";
var createGist = function(file_name, content, description, token){
  var data= {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }

  $.ajax({
    url : baseUrl + "/gists",
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: "token " +token
    },
    success: function(response) {
      console.log(response);

    }
  }).done(function(response){
    myGists(response["owner"]["login"],token);
  });

};

var displayGist = function(response) {
  response.forEach(function(object) {
    $("#public-gists").append(object["description"]);
  });
}

var myGists = function (username, token){
  $.ajax({
    url :baseUrl + "/users/" +username+ "/gists",
    type: 'GET',
    dataType: 'json',
    headers: {
        Authorization: "token " +token
      },
    success: function(response) {
      displayGist(response);
      debugger;
    }
  });

};



var bindCreateButton = function() {
  $('#new-gist').on('click', function(event){
    var file_name = $("#file_name").val() ;
    var token = $("#token").val() ;
    var description = $("#description").val() ;
    var content = $("#content").val() ;
    createGist(file_name, content, description, token);
    event.preventDefault();
  })
};
$(document).ready(function(){

  bindCreateButton();
});
