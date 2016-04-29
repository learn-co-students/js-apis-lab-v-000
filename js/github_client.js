//define functions here

var defaultUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){

};

var myGists = function(username, token) {
  // var username = typeof username == "undefined" ? "authobeard" : username;
  // var token = typeof token == "undefined" ? mySecret() : token;
  // debugger;
  $.ajax({
    url: defaultUrl + "users/" + username + "/gists",
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
  var username = $('#userame')
  var token = $('#token')
  $("#my-gists").click(myGists(username, token))
});
