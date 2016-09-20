//define functions here
var createGist = function(fileName, content, description, token){
  // console.log(description);

  // var data = {
  //   'description': description,
  //   'public': true,
  //   'files': {}
  // };
  //
  // data['files'][fileName] = {
  //   'content': content
  // };

  var data = {
  "description": "Some Description",
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
  $.each(response, function(k, v){
  })
}

$(document).ready(function(){
  bindCreateButton();
  // createGist();
});

// var token = 'daae76e10edb31bd5b2dd41bfaa0fa4415ff2cc9';
// daae76e10edb31bd5b2dd41bfaa0fa4415ff2cc9
