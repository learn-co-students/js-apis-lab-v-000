var createGist = function(file_name, content, description, token){
  var data = {
    'public': true,
    'description': description,
    'files': {}
  }

  data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token);
  });
};

var myGists = function(username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    success: function(data){
      html = '';
      $.each(data, function(index, gist){
        html += '<li>';
        html += '<a href=';
        html += gist.html_url + '>';
        html += gist.description;
        html += '</a></li>';
      })
      $('.gists').append(html);
    }
  });
};

var bindCreateButton = function() {
  $('#submit').click(function(){
    var name = $('#file_name').val();
    var token = $('#token').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(name, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});
