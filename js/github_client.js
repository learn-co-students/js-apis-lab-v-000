$(document).ready(function(){
  bindCreateButton();
});

var bindCreateButton = function() {
  $('#create').click(function() {
    var token = $('#token').val();
    var fileName = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(fileName, content, description, token);
  })
};

var createGist = function(fileName, content, description, token) {
  var data = {
      public: true,
      description: description,
      files: {
        // [fileName]: {
        //   content: content
        // }
      }
    };

    data['files'][fileName] = {
      content: content
    };

    $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      },
      data: JSON.stringify(data)
    }).done(function(response) {
      myGists(response.owner.login, token);
    });
  };

var myGists = function (username, token) {
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists){
    $('#yourGists').html('');

    $.each(gists.data, function(index, gist) {
      var link = $('<a>').attr('href', gist.html_url).text(gist.description);
      var listItem = $('<li>').append(link);
      $('#yourGists').append(listItem);
    })
  })
};
