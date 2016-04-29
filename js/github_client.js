//define functions here
var username;
var token; 

function setDefaults(username, token) {
  // debugger;
  
}

var defaultUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){

};

var myGists = function(username, token) {
  debugger;
  var username = $('#username').length > 0 ? $('#username').val() : "authorbeard"
  var token = $('#token').length > 0 ? $('#token').val() : mySecret()
    $.ajax({
      url: defaultUrl + "users/" + username + "/gists",
      type: 'GET',
      dataType: 'json',
      headers: {
        Authorization: "token " + token
      }
    }).done(function(gists){
      $.each(gists, function(index, gist) {
        $('body').append(gist.description)
      })
    })
};
  

var bindCreateButton = function() {

  $("#my-gists").click(myGists)   
}


$(document).ready(function(){
  bindCreateButton();
});
