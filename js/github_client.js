//define functions here
var createGist = function(file_name, content, description, token){

};

var myGists = function (username, token){
   $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "jsonp"
  }).done(function(gists) {
    displayGists(gists);
  });
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});


