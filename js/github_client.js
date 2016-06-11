//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'public': true,
    'description': description,
    'files': {}
  };

  data['files'][file_name] = {
    'content' : content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(response){
    myGists(response.owner.login, token);
  });


};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(response){

    $.each(response.data, function(index,gist){
      $('#gist_ul').append('<li>'+gist+'</li>')
    })
 })
};

var bindCreateButton = function() {
  // call functions here
  $("create_gist").click(function(){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
  bindCreateButton();
});
