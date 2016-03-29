//define functions here
var createGist = function(file_name, content, description, token){
  var gistData = {"public": true,
                  "description": description,
                  "files": {}
                };
  gistData['files'][file_name] = { "content": content }
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    },
    data: JSON.stringify(gistData)
  }).done(function(response){
    myGists(response.owner.login, token)
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
  }).done(function(gists){
    $.each(gists, function(index, gist){
      var gistHTML = '<li><a href="' + gist.data.html_url + '">' + gist.data.description + '"</a></li>';
      $("ul#gists").append(gistHTML);
    })
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create_gist').click(function(){
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(file_name, content, description, token);
  })

};

$(document).ready(function(){
  bindCreateButton();
});


var token = "fdd3e658c926d5ce7485f4d0d81f50a3e7ee503a";