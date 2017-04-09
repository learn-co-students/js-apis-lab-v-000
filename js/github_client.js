//define functions here


//var token = '9f7613649e52da38b2c61e109bff2802f46d4cb0'
var createGist = function(file_name, content, description, token){
  
  var data = {"public": true, "description": description, "files": {}}
  data['files'][file_name] =  {'content': content}
  var d = JSON.stringify(data)
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    
    headers: {
    Authorization: token
  },
  data: d,})
    
  .done(function(data){
 +  myGists(data.owner.login, token);
  }

  )

};

var myGists = function (username, token){
  var userUrl = 'https://api.github.com/users/' + username + '/gists'
  $.ajax({
    url: userUrl, 
    contentType: 'application/json',
    success: function(data) {
      debugger
      for (i = 0; i < data.length; i ++) {

    $('#gists').append('<div>Public: ' + data[i].public + '</div>')
    $('#gists').append('<div>Url: ' + data[i].url + '</div>')
    $('#gists').append('<div>Description: ' + data[i].description + '</div><br><br>')
    }
  }
  })

};

var bindCreateButton = function() {

  createGist($('#fileName').val(), $('#content').val(), $('#description').val(), $('#token').val())

};




$(document).ready(function(){

 bindCreateButton()
});





