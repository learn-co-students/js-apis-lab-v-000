//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
      'description': description,
      'public': true,
      'files': {}
    };

  data['files'][file_name] = {'content': content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token);
  })
};

var myGists = function (username, token){
  var url = 'https://api.github.com/users/' + username + '/gists';
  var success_callback = function(response){
    return response;
  };
  $.getJSON(url, success_callback);
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
