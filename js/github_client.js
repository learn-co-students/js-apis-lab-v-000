//define functions here

var defaultUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){

};

var myGists = function (username, token){
  $.ajax({
    url: defaultUrl + "/users" + username + "/gists",
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token" + token
    }
  }).done(function(gists){
    console.log("Got 'em")
  })
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
