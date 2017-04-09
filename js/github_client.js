//define functions here
var createGist = function(file_name, content, description, token){
   
   var data = { 
    "description": description,
    "public": true,
    "files":{}
    }

    data.files[file_name] = {"content" : content}

  $.ajax({
     url: 'https://api.github.com/gists',
     type: 'POST',
     dataType: 'json',
     headers: {
       Authorization: 'token ' + token
     },
     data: JSON.stringify(data)
   }).done(function(response){
     myGists(response.owner.login, token);
  });

};

var myGists = function (username, token){
  $.ajax({
    type: 'GET',
    url: "https//api.github.com/users/" + username + "/gists",
    dataType: 'json',

     success: function(data) {
      data.forEach(function(gist) {
        var string = "<p>" + "<a href=" + entry.html_url + ">" + gist.description + "</a>" + "</p>";
        $("#gists").append(str);
      })
    }

  });

};

var bindCreateButton = function() {
   $('#submit').on('click', function(){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(file_name, content, description, token);
  })

};

$(document).ready(function(){
  bindCreateButton();
});
