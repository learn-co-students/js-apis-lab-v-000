//define functions here
var createGist = function(filename, content, description, token){
  var input = {
    public: true,
    description: description,
    files: {
      [filename]: {
        content: content
      }
    }
  };
  $.ajax({
  url: 'https://api.github.com/gists',
  type: 'POST',
  dataType: 'json',
  data: JSON.stringify(input),
  headers: {
    Authorization: `token ${token}`
  }
}).done(function( data ) {
      myGists(data.owner.login, token);
  });
};

var myGists = function (username, token){
  var url = `https://api.github.com/users/${username}/gists`;
  var success_callback = function (results){
    $('#ui').html(results)
  };
  $.getJSON(url, success_callback);
};

var bindCreateButton = function() {
  $('#submit').click(function() {
    filename = $('#filename').val();
    content = $('#contents').val();
    description = $('#description').val();
    token = $('#token').val();
    createGist(filename, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
