//define functions here
var data = {
  'public':   true,
  'description': 'test description',
  'files': {
    'test_file.md': {
      'content': 'fake content'
    }
  }
};

var createGist = function(file_name, content, description, token){
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: "token cdeba3333fd3747693a0537dc4f911b9118c5029"
    }
  }).done( function(e) {
    myGists(e.owner.login, token);
  });
};

var addHTML = function (html){
  $('#gist_results').html(html);
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/'+username+'/gists',
    type: 'GET',
  }).done( function(e) {
    addHTML(e);
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').click(function(event) {
    var file        = $("input[name='file_name']").val();
    var token       = $("input[name='personal_token']").val();
    var description = $("input[name='gist_description']").val();
    var contents    = $("input[name='gist_contents']").val();
    
    createGist(file, token, description, contents);
  });
};

$(document).ready(function(){
    bindCreateButton();
});
