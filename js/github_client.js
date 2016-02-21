
//define functions here
var createGist = function(file_name, content, description, token){
  var send_data={
    "description": description,
    "public": true,
    "files": {}
  }
  var file={content: content};
  send_data['files'][file_name]=file;
  $.ajax({
     url: 'https://api.github.com/gists',
     type: 'POST',
     dataType: 'json',
     beforeSend: function(xhr) {
       xhr.setRequestHeader("Authorization", "token "+token);
     },
     data: JSON.stringify(send_data)
  }).done(function(return_data){
    myGists(return_data.owner.login, token)
  }).fail();
};

var myGists = function (username, token){
  $.getJSON('https://api.github.com/users/'+username+'/gists', function(data){
    //debugger;
    var gistsHTML='<h2>'+'User has '+data.length+' gists</h2><br>';
    data.forEach(function(gist){
      var gistText = '<a href="'+gist['html_url']+'">'+gist['description']+'</a>';
      gistsHTML+=gistText+'<br>';
      debugger;
    })
    $('#gists').html(gistsHTML)
  });
};



var getGistInfo = function (){
  
  var token = $('input[name=token]').val();
  var file_name = $('input[name=file_name]').val();
  var description = $('input[name=description]').val();
  var content = $('input[name=content]').val();
  createGist(file_name, content, description, token);
};

var bindCreateButton = function() {
  // call functions here
  $('#gist_form').submit(function(event){
    console.log('clicked!')
    event.preventDefault();
    getGistInfo();
  });
};

$(document).ready(function(){
  bindCreateButton();
});
