//define functions here

var createGist = function(file_name, content, description, token){
  var gistData = {
    "description": description, 
    "public": true,
    "files": {
      //to pass the file name as a param, had to put brackets [] around file_name
      //without brackets, param is not passed, and just says file_name instead of test.md
      [file_name] : {"content": content}}
    }

 $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(gistData)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
  }).done(function(gists) {
    $.each(gists, function(index, gist) {
      var html_url = gist.html_url;
      var description = gist.description;
      var html = "";
      html += "<li><a href='" + html_url + "'>" + description + "</a></li>";
      $("#gistlist").append(html);
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').click(function() {
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
