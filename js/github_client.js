

//define functions here

// returns the gists for a user.
var createGist = function(file_name, content, description, token){
  $.ajax({
     url: "https://api.github.com/gists",
     type: "POST",
     data: JSON.stringify(
       {
         description: description,
         "files": {
           file_name: {
             "content": content
           }
         }
       }
     )
  })
  .done(function(response){
    console.log(response);
  })
  .fail(function(error){
    console.log(error + "crap")
  })
};


var myGists = function (username, token){
  var username="lennhy";
  var myUrl = "https://api.github.com/users/"+username+"/gists"
  $.ajax({
    url: myUrl,
    type: "GET"

  }).done(function(gists){
      // myGists(username, token)
      $.each(gists, function(i, gist){
        console.log(gist);
      });
  });
};

var bindCreateButton = function() {
  var token = $('#token').val();
  var file_name = $('#name').val();
  var description = $('#description').val();
  var content = $('#content').val();

  $('#create').click(function() {
    createGist(file_name, content, description, token);
  });
};


$(document).ready(function(){
  // myGists();
  bindCreateButton();
});
