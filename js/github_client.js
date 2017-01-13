//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
      'public': true,
      'description': description,
      'files': {}
};
data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
    Authorization: "token e883da8ad76a053de53becc42b232cfbbbd884ae"
    },
    data: JSON.stringify(data)
  }).done(function(response) {
      myGists(response.owner.login, token);
  });
};
var myGists = function (username, token){
  $.ajax({
      url: "https://api.github.com/users/:" + username + "/gists",
      type: 'GET',
      dataType: 'jsonp',
      headers: {
      Authorization: "token e883da8ad76a053de53becc42b232cfbbbd884ae"
      }
    }).done(function(user) {
      $('#myGists').html("")
        addMyGists(user)
    })
  };


function addMyGists(user) {
    $.each(user.data, function(index, gist) {
      var info = gist.description;
      $('#myGists').append(info);
    })
  }


var bindCreateButton = function() {
  $('#create').click(function() {
      var token = $('#token').val();
      var file_name = $('#file_name').val();
      var content = $('#content').val();
      var description = $('#description').val();

      createGist(file_name, content, description, token);
    });
  };

$(document).ready(function(){
});
