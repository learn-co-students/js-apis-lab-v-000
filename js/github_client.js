
var createGist = function(file_name, content, description, token){
  var url = "https://api.github.com/gists";
  var data = JSON.stringify({
        'public': true,
        'description': description,
        'files': {
          file_name: {
            'content': content
          }
        }
      });
  debugger;
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: data,
    headers: {
      Authorization: token
    }
  }).done(function(response){
    var username = response[0].owner.login;
    myGists(username, token);
  });
};

var myGists = function (username, token){
  var url = "https://api.github.com/users/" + username + "/gists";
  $.ajax({
    url: url,
    dataType: 'json',
    headers: {
      Authorization: token
    }
  }).done(function(response){
    displayGists(response);
  });
};

var displayGists = function(gistData){
  $.each(gistData, function(index, element){
    var gistMarkup = '<p><a href="' + element.owner.html_url + '">' + element.description + '</a></p>'
    $('#gistlist').append(gistMarkup);
  });
  
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(event){
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
