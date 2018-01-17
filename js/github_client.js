//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
  'public':   true,
  'description': description,
  'files': {}
  }; 

  data['files'][file_name] = {
    'content': content
  };

 $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'token ' + token)
    },
    data: JSON.stringify(data)
   }).done(function(response) {
    myGists(response.owner.login, token);
  }); 
};

var myGists = function(username, token){
 $.ajax({
      url: 'https://api.github.com/users/' + username + '/gists',
      type: 'GET',
      dataType: 'jsonp',     
  }).done(function(gists) {
    console.log(gists)
    $.each(gists.data, function(index, gist) {
      var link = (index+1) +'. <a href="' + gist.html_url + '">' + gist. description + '</a><br>';
      $('div#gist_list').append(link);
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function() {
  var token = $('#token').val();
  var file_name = $('#file_name').val();
  var content = $('#content').val();
  var description = $('#description').val();
  });
};

$(document).ready(function(){
  bindCreateButton();
});












