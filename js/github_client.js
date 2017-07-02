
//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": "test description",
    "files": {}
    };

    data['files'][file_name] = {
        'content': 'fake content'
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: "POST",
    dataType: 'jsonp',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", 'token ' + token);
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token)
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'  
  }).done(function(gists) {
    $('#myGists').html('');

    $.each(gists.data, function(index,gist) {
      var linkTag = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);

      var listItemTag = $('<li>')
        .append(linkTag);
      $('#myGists').append(listItemTag);
    })
  })
};

var bindCreateButton = function() {
  $('#submit').on('click', function(event) {
    var token = $('#gh-key').val();
    var name = $('#file-name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});