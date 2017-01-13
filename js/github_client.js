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
    url: "https://api.github.com/gists", 
    type: 'POST', 
    dataType: 'json', 
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);     
    }, 
    data: JSON.stringify(data), 
    }).done(function(response) {
      var username = response.owner.login; 
      myGists(username, token); 
  }).fail(function(response) {
    $("#gists").append(response.status);
  });    
}; 

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",  
    type: "GET", 
    dataType: 'jsonp', 
  }).done(function(response) {
    $('#gists').html(''); 
    var str = "<h1>Gists for " + username + "</h1"; 
    $('#gists').append(str)
    $.each(response.data, function(index, gist) {
      var link = $('<a>') 
        .attr('href', gist.html_url) 
        .text(gist.description); 

      var listItem = $('<li>') 
        .append(link); 

      $('#gists').append(listItem); 
    })
    $('#gists').append("----------------------------")
  });    
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').click(function(){
    var file_name = $('#filename').val(); 
    var content = $('#contents').val(); 
    var description = $('#description').val(); 
    var token = $('#token').val(); 

    createGist(file_name, content, description, token); 
    
  }); 
};

$(document).ready(function(){
  bindCreateButton(); 
});
