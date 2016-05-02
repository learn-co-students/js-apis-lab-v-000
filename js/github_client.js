var baseUrl = "https://api.github.com";
//define functions here
var createGist = function(file_name, content, description, token){
    var url = baseUrl + "/gists";
    var file_content = {};
    file_content[file_name] = {content: content};
    $.ajax({
        url: url, 
        type: "POST",
        headers: {
            Authorization: "token " + token
        },
        data: JSON.stringify({
            description: description, 
            "public": true,
            files: file_content
        })
    }).done(function(data) {
        setTimeout(myGists(data["owner"]["login"], token), 2000);
        console.log("It worked!!!");
    }).fail(function(error){
      console.log("something went wrong: " + error);
    });
};

var listGists = function(gists) {
  var output = "";
  output += '<ul class="gist-list">';
  $.each(gists, function(index, gist) {
    output += '<li>';
      output += '<a href="' + gist.html_url + '">';
        output += gist.description;
      output += '</a>';
    output += '</li>';
    console.log(gist.description + " " + gist.html_url);
  })
  output += '</ul>';
  $('#gists').html(output);
}

var myGists = function (username, token){
    var url = baseUrl + "/users/" + username + "/gists";
    $.ajax({
        url: url, 
        type: "GET", 
        headers: {
            Authorization: "token " + token
        }
    }).done(function(gists) {
        listGists(gists);
    });
};

var bindCreateButton = function() {
  $('#new-gist').on('submit', function(event){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();
    event.preventDefault();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
    bindCreateButton();
});
