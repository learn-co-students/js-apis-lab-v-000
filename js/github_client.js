//define functions here
var createGist = function(file_name, content, description, token){
  
  var postData = {
    "description": description,
    "public": true,
    "files": {
      file_name: {
        "content": content
      }
    }
  }
  
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(postData),
    headers: {
      Authorization: "token " + token
    }
  }).done(function(data){
    myGists(data.owner.login, token);
  })
};

var myGists = function (username, token){
  var url = "https://api.github.com/users/" + username + "/gists";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + token
    }
  }).success(function(data){
    // console.log(data);
    $("#user-gists ul").html("");
    $.each(data, function(index, gist){
      console.log(gist);
      var gistURL = gist.html_url;
      var gistName = gist.description;
      console.log("url: " + gistURL + "\n description: " + gistName);
      $("#user-gists ul").append("<li><a href='" + gistURL + "'>" + "Gist Number: " + index + "</a></li>");
    });

  });
};

var bindCreateButton = function() {
  // call functions here
  $("input#submit").on("click", function(event){
    var name = $("input#username").val();
    var token = $("input#token").val();
    var fileName = $("input#file-name").val();
    var content = $("textarea#content").val();
    var description = $("input#description").val();
    console.log("user: " + name + "\n filename: " + fileName + "\n content: " + content + "\n description: " + description)
    myGists(name, token);
    if(fileName.length > 1 && content.length > 1 && description.length > 1){
      createGist(fileName, content, description, token);
    }
    event.preventDefault();
  });
};

$(document).ready(function(){
  bindCreateButton();
});
