//define functions here
var createGist = function(file_name, content, description, token){
  // console.log(description);

  // var data = {
  //   'description': description,
  //   'public': true,
  //   'files': {}
  // };
  //
  // data['files'][file_name] = {
  //   'content': content
  // };

  var data = {
  "description": "Some Description goes here.",
  "public": true,
  "files": {
    "file1.txt": {
      "content": "String file contents"
    }
  }
}

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    console.log(response);
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  var baseURL = "https://api.github.com";
$.ajax({
    url: baseURL + "/users/" + username + "/gists",
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    }
  }).done(function(response){
    console.log(response);
    displayGists(response);
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create-gist').click(function(){
    var token = $('#token').val();
    var fileName = $('#file-name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(fileName, content, description, token);
  });
};

var displayGists = function(response) {
  var html = ""
  $.each(response, function(k, v){
    html += "<p>"
    html += "<a href='" + v. html_url+ "'>"
    html += v.description
    html += "</a>"
    html += "</p>"
  })

  $('#gists').html(html);
}

$(document).ready(function(){
  bindCreateButton();
});
