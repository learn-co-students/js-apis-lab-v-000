//define functions here
var createGist = function(file_name, content, description, token){

  var data = { 'description': description, 'public': true, 'files': {}};
  data['files'][file_name] =  { 'content': content }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    //debugger;
    myGists(response.owner.login, token);
  });

};

var myGists = function (username, token){

  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
     $.each(gists.data, function(index, gist) {
       var html ='<tr><td><a href='+ gist.html_url + '>'+ gist.description +'<a></td><tr>';
       $('tbody').append(html);
     })
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(event) {

    var token = $('#personal_token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
  bindCreateButton();
});
