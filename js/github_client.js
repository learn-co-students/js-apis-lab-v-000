//define functions here
function createGist(file_name, content, description, token) {
  var thisIsAFile = file_name;
  var info = {};
  info[thisIsAFile] = {content: content};
  var data = JSON.stringify({
    public: true,
    description: description,
    files: info
  });

   $.ajax({
     url: 'https://api.github.com/gists',
     type: 'POST',
     dataType: 'json',
     data: data,
     headers: {
        Authorization: token
   }
 }).done(function(results) {
    var name = results.owner.login
    myGists(name, token);
  });
};

var myGists = function (username, token){
  var getThatUrl = 'https://api.github.com/users/' + username + '/gists';
  var successCallback = function(results) {
 		console.log(results);
 	}
 	$.getJSON(getThatUrl, successCallback);
  };



var bindCreateButton = function() {
  $('#submit').click(function() {
      var file_name = $('#file_name').val();
      var description = $('#description').val();
      var content = $('#content').val();
      var token = $('#token').val();
    createGist((file_name, content, description, token));
  });
};

$(document).ready(function(){

});
