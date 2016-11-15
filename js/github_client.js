// creates and returns the gists of a user.
var createGist = function(file_name, content, description, token){
  var data = {
    description: description,
    "public": true,
    "files": {}
  };
  // Below file_name is being set to the file_name parameter being passed in above
  data["files"][file_name] = {"content": content};
  $.ajax({
     url: "https://api.github.com/gists",
     type: "POST",
     dataType: 'json',
     beforeSend: function (request){
           request.setRequestHeader("Authority", token);
     },
     data: JSON.stringify(data)
  })
  .done(function(response){
    console.log(response);
    myGists(response.owner.login, token);
  })
  .fail(function(error){
    console.log(error.responseText)
  })
};

// Get user gists
var myGists = function (username, token){
  var myUrl = "https://api.github.com/users/"+username+"/gists"
  $.ajax({
    url: myUrl,
    type: "GET"

  }).done(function(gists){
      $.each(gists, function(i, gist){
        console.log(gist);
      });
  });
};

// click event triggers gist creation
var bindCreateButton = function() {
  var token = $('#token').val();
  var file_name = $('#file_name').val();
  var description = $('#description').val();
  var content = $('#content').val();

  $('#create').click(function() {
    createGist(file_name, content, description, token);
  });
};


$(document).ready(function(){
  bindCreateButton();
});
