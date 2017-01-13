
function buildData(file_name, content, description) {
  var data = {}
    data.public = true
    data.description = description

    data.files = {}
    data.files[file_name] = {content: content}

    return data
}

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

  $("#create-gist").click(function(event){

    var file_name = $('#file-name').val()
    var content = $('#content').val()
    var description = $('#description').val()
    var token = $('#token').val()

    createGist(file_name, content, description, token)
  })   
}


$(document).ready(function(){
  bindCreateButton();
});









