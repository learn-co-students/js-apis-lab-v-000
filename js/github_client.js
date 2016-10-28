//define functions here
// var token = 64617174385df2078fd7e2115c8f5a8ae2b2b593;

var createGist = function(file_name, content, description, token){
  var data = {
    "description": description,
    "public": true,
    "files": {}
  }

  data.files[file_name] = {
    "content": content
  }
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "64617174385df2078fd7e2115c8f5a8ae2b2b593"
    }
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token)
  })
};

var myGists = function (username, token){

};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
   bindCreateButton();
});


// Tokens you have generated that can be used to access the GitHub API.
// gist 64617174385df2078fd7e2115c8f5a8ae2b2b593