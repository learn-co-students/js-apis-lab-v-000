//define functions here
// var login;
// var token; 
// var filename ='test_file.md'
// var content = 'fake content'
// var description = 'test description'
// var token = 'fake token'


// var data = {}
// data.public = true
// data.description = description

// data.files = {}
// data.files[filename] = {content: content}


function buildData(file_name, content, description) {
  var data = {}
    data.public = true
    data.description = description

    data.files = {}
    data.files[file_name] = {content: content}

    return data
}


////ACTUAL CODE BELOW //////

var defaultUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){
  
  /// USERNAME IS DERIVED FROM THE RESPONSE (STH LIKE RESPONSE.LOGIN)
  // var username = $('#username').length > 0 ? $('#username').val() : "authorbeard"
  /// SETTING DEFAULT THIS WAY CAUSES TESTS TO FAIL
  // var token = typeof token !== 'undefined' ? token : mySecret()

  var data=buildData(file_name, content, description)
  
  $.ajax({
    url: defaultUrl + "gists",
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: "token " + token
    },
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









