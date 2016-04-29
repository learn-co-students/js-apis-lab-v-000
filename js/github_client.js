//define functions here
// var login;
// var token; 

var defaultUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){
  
  /// USERNAME IS DERIVED FROM THE RESPONSE (STH LIKE RESPONSE.LOGIN)
  // var username = $('#username').length > 0 ? $('#username').val() : "authorbeard"
  /// SETTING DEFAULT THIS WAY CAUSES TESTS TO FAIL
  // var token = typeof token !== 'undefined' ? token : mySecret()

  $.ajax({
    url: defaultUrl + "gists",
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify({ 
        'public': true,
        'description': description,
        'files': {
          String(file_name): {
            'content': content
          }
        }
      })
  }).done(function(response){
    var username = response.owner.login
    myGists(username, token)
  })

};

var myGists = function(username, token) {

    $.ajax({
      url: defaultUrl + "users/" + username + "/gists",
      type: 'GET',
      dataType: 'json',
      headers: {
        Authorization: "token " + token
      }
    }).done(function(gists){

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

  $("#my-gists").click(createGist())   
}


$(document).ready(function(){
  bindCreateButton();
});
