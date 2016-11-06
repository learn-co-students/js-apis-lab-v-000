//define functions here
var createGist = function(file_name, content, description, token){

  var gitData = {
    'public': true,
    'description': description,
    'files': {}
  };

  gitData['files'][file_name] = {
    'content': content
  }

  $.ajax({
    url: "https://api.github.com/gists",
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token 
    },
    data: JSON.stringify(gitData),
  }).done(function(data) {
      myGists(data.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: 'GET',
    dataType: 'jsonp',
    headers: {
      Authorization: "token " + token
    },
  }).done(function(gists){
    $.each(gists, function(index, gist){
      var html_url = gist.html_url
      var description = gist.description
      var html = ""
      html += "<li><a href='" + html_url + "'>" + description + "</a></li>";
      $("#myGists").append(html)
    })
  })
};


var bindCreateButton = function() {

  $('#create').click(function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
  bindCreateButton();
});
