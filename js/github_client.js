//define functions here
var createGist = function(file_name, content, description, token){

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
    console.log(data);
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
