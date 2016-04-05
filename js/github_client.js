
// var token = db410c6cd187a7b37b18b9d7395da98c39cca62a;
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
    type: 'POST',
    url: 'https://api.github.com/gists',
    data: JSON.stringify(data),
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'token' + token);
    },
  }).done(function(response) {
    myGists(response.owner.login, token);
  })

};

var myGists = function (username, token){

  $.get('https://api.github.com/users/' + username + '/gists', function(data) {
    $('#gists').html('');
    data.forEach(function(gist) {
      $('#gists').append('<li><a href="' + gist.html_url + '">' + gist.description + '</a></li>');
    });
  });

};

var bindCreateButton = function() {
  
  $('#create').click(function() {
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
