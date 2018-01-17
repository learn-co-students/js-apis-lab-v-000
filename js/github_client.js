//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": description,
    "files": {}
    };

    data['files'][file_name] = {
        'content': content
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: "POST",
    dataType: 'json',
    headers:{
      Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token)
  });
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: 'GET',
    dataType: 'jsonp',
    headers:{
      Authorization: "token " + token
    }
  }).done(function(response){
      $('#gists').html('');
      var html = '';
      response.data.forEach(function(gist){
        html += "<h3>" + gist.files.filename + "</h3>";
        html += "<a href=\'" + gist.url + "\'> Link </a>";  
      });
      $('#gists').html(html);
  });
};

var bindCreateButton = function(event) {
  // call functions here
  $('#create').on('click', function(){
    var token = $('#token').val();
    var file_name = $('file_name').val();
    var content =  $('#content').val();
    var description = $('#description').val();
    createGist(file_name,content, description, token)
    event.preventDefault();
  });
};



$(document).ready(function(){
  bindCreateButton();
});
