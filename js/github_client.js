//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'public': true,
    'description': description,
    'files': {}
  };
  data['files'][file_name] = {
    content: content
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response.owner.login, token);
  });
};

var myGists = function(username, token){
  $.ajax({
    url: 'https://api.github.com/users' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
  }).done(function(gists){
    $('#myGist').html("");
    $.each(gists.data, function(index, gist){
      var linkTag = $('<a>')
      .attr('href', gist.html_url)
      .text(gist.description);

      var listItemTag = $('<li>')
      .append(linkTag);
      $('#myGist').append(listItemTag);
    })
  })
};

var bindCreateButton = function() {
  $('#create_button').on('click', function(event){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(file_name, content, description, token);
  })

};

$(document).ready(function(){
  bindCreateButton();
});
