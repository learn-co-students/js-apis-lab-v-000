//define functions here
var myUsername = "jsbenning";

var createGist = function(file_name, content, description, token) {
  var files = {};
  files[file_name] = {"content": content};

  var myData = {
    "description": description, 
    "public": true, 
    "files": files
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(myData),
    headers: {
      Authorization: "token " + token 
    }
  }).done(function(response) {
    console.log(response);
    myGists(response.owner.login, token);
  });  
}


var myGists = function (username, token) {
    $.ajax({
      url: "https://api.github.com/users/" + username + "/gists", 
      type: 'GET', 
      dataType: 'json',
      data: 'data',
      headers: {
        Authorization: "token " + myToken 
      } 
    }).done(function(data) {
      if (data.length >= 1) {
        for (var i = 0; i < data.length; i++) {
          $('#links').append('<p><a href="' + data[i]['html_url'] + '">' + data[i]['description'] + '</a></p>');
        }
      }
    })
    .fail(function() {
      alert("Something broke!");
    })
};


var bindCreateButton = function(event) {
  // call functions here
  event.preventDefault();

  var myFilename = $('#file_name').val();
  var myEnteredToken = $('#token').val();// or myToken?
  var myDescription = $('#description').val();
  var myContent = $('#content').val();
  
  createGist(myFilename, myContent, myDescription, myEnteredToken);  
};



$(document).ready(function(){
    $("#create").on("click", bindCreateButton) 
});


