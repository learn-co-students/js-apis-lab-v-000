//define functions here
var createGist = function(file_name, content, description, token){
  var file = {}
  file[`${file_name}`] = {content: content}

  var body = {
    description: description,
    public: true,
    files: file
  }
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    body: JSON.stringify(body),
    headers: {
      Authorization: "Token " + token
    }
  }).done(gist => {
    myGists(gist.owner.login, token)
  })
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "Token " + token
    }
  })
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
