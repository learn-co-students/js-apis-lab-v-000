//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };

  // Sets data equal to the info we want to create a gist of
  data['files'][file_name] = {
    'content': content
  };
  // sets the data hash with the proper formating
  $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      dataType: 'json',

      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      },
      data: JSON.stringify(data)
      // stringifies into '{"description": "' + description + '","public": true,"files": {"'+file_name+'": {"content": "'+content+'"}}}'
  }).done(function(response) {
      // console.log(response);
      myGists(response.owner.login, token);
  });

};

var myGists = function (username, token) {
  $.ajax({
      url: 'https://api.github.com/users/' + username + '/gists',
      type: 'GET',
      dataType: 'jsonp',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      }
  }).done(function(response) {
    $.each(response.data, function(index, iData){
      $('#list').append(
        '<li><a href="'+iData.html_url+'">'+iData.description+'</a></li>'
      );
    })
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create').on('click', function () {
    var token = $('#token').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var file_name = $('#file_name').val();

    createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});
