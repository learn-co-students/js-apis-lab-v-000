//define functions here
var myToken = "5e93ddf0af09639c8daaaf95192dab822ce28d46";
var myUsername = "jsbenning";

var createGist = function(file_name, content, description, token) {
  var myData = {
    "description": description, 
    "public": true, 
    "files": {
      file_name: {
        "content": content
      }
    }
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: 'myData',
    headers: {
      Authorization: "token " + myToken 
    }
  }).done(function(response) {
    console.log(response);
  });  
}


var myGists = function (username, token) {
    $.ajax({
      url: "https://api.github.com/users/jsbenning/gists", 
      type: 'GET', 
      dataType: 'json',
      data: 'data',
      headers: {
        Authorization: "token " + myToken 
      } 
    }).done(function(data) {
      if (data.length >= 1) {
        $('#links').append("<h3>Here Are Your Gist Links:</h3>");
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
  var myEnteredToken = ($('#token').val() || myToken);
  var myDescription = $('#description').val();
  var myContent = $('#content').val();

  createGist(myFilename, myContent, myDescription, myEnteredToken);
  myGists(myUsername, myToken);
  
};



$(document).ready(function(){
    $("#create").on("click", bindCreateButton) 
});


