//define functions here
var username;
var token; 

var defaultUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){
  
};

var myGists = function(username, token) {

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
    // debugger;
      var row = "<div class=\"gists\">"
      $.each(gists, function(index, gist){
        row += "<div class=\"gist-display\">"
        row += "<a href=" + gist.html_url + ">"
        row += gist.description + "</a>"
      })
      row += "</div>"
      $('#gist-list').append(row)
    })
};
  

var bindCreateButton = function() {

  $("#my-gists").click(myGists)   
}


$(document).ready(function(){
  bindCreateButton();
});
