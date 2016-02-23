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
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    //Update the UI to show the list of public gists for the user
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#myGists').html(''); //resets to blank so it doesn't reload over and over when you submit again

    $.each(gists.data, function(index, gist) {
      //Use the html_url for the href and the description from the gist as the link text
      var link = $('<a>').attr('href', gist.html_url).text(gist.description);
      var listItem = $('<li>').append(link);
      $('#myGists').append(listItem);
    })
  });
};

var bindCreateButton = function() {
  $('#button').click(function(event) {
    var form_token = $('#token').val();
    var form_name = $('#name').val();
    var form_description = $('#description').val();
    var form_content = $('#content').val();

    //Create a public gist for the user
    createGist(form_name, form_content, form_description, form_token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});