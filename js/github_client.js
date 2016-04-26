//define functions here
// var createGist = function(file_name, content, description, token){
//
//   $.ajax({
//     url: 'https://api.github.com/gists',
//     type: 'POST',
//     dataType: 'json',
//     headers: {
//       Authorization: "token" +token
//     },
//    public : true, description : description, files : { file_name : { content : content } }
//   }).done(function(response) {
//     myGists(response.owner.login, token);
//   });
// };

var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": description,
    "files": {
    }
  };
  data.files[file_name] = {
    "content": content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
    Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};


var myGists = function (username, token){

  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'get',
    dataType: 'json',
    headers: {
      Authorization: "token" +token
    }
  })
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
