// github token = 183e463f467342ce8c26424919376cecb0917a8b
// https://api.github.com/users/reichardn/gists
// https://api.github.com/gists
//define functions here



var createGist = function(file_name, content, description, token){
  $.ajax({
    type: 'POST',
    url: 'https://api.github.com/gists',
    data: {
      "description": "the description for this gist",
      "public": true,
      "files": {
        "file1.txt": {
          "content": "String file contents"
        }
      }
    },
    headers: {
      Authorization: `token ${token}`
    },
    success: function(msg){
      console.log('successfully created');
    },
    error: function(e) {
      console.log(e)
    }
  });
};

var myGists = function (username, token){
  var json;
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    async: false,
    headers: {
      Authorization: `token ${token}`
    },
    success: function(response) {
      json = response;
    },
    error: function (error) {
      console.log('error');
    }
  });
  return json;
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
