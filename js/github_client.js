//define functions here
var createGist = function(file_name, content, description, token){
  gist_object = {
    'description':description,
    'public':true,
    'files':{}
  };
  gist_object['files'][file_name] = {'content':content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(gist_object),
    headers:{
      Authorization: 'token ' + token
    }
  }).done(function(newGist){
    myGists(newGist.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'GET',
    headers : {
      Authorization: 'token ' + token
    }
  }).done(function(gists){
    $.each(gists, function(index, gist){
      var gist_link = $('<a>').attr('href', gist.html_url).text(gist.description);
      var li = $('<li>').append(gist_link);
      $('#gist-ul').append(li);
    });
  });
};

var resetForm = function (){
  $('#filename').reset();
  $('#content').reset();
  $('#description').reset();
  $('#token').reset();
};

var bindCreateButton = function() {
  $('#create').click(function(event){
    createGist($('#filename').val(), $('#content').val(), $('#description').val(), $('#token').val());
  });
};

$(document).ready(function(){
  bindCreateButton();
});
