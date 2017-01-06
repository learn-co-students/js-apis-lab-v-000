//define functions here
var createGist = function(file_name, content, description, token){
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    body: {
      description: description,
      public: true,
      files: {
        file_name: {
          content: content
        }
      }
    },
    headers: {
      Authorization: token
    }
  })
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: token
    }
  })
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
