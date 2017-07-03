var createGist = function(fileName, contents, desc, token){
  var gistsUrl = "https://api.github.com/gists";
  var data = {
    'public':   true,
    'description': desc,
    'files': {}
  };

  data['files'][fileName] = {
    'content': contents
  };

  $.ajax({
    url: gistsUrl,
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

var myGists = function (username, token){
  var getGistsUrl = 'https://api.github.com/users/' + username + '/gists';
  $.ajax({
    url: getGistsUrl,
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#gists').html('');

    $.each(gists.data, function(index, gist) {
      var link = $("<a>")
        .attr('href', gist.html_url)
        .text(gist.description);

      var item = $("<li>")
        .append(link);

      $('#gists').append(item);

    })
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#submit').on("click", function() {
    var fileName = $('#fileName').val();
    var contents = $('#contents').val();
    var desc = $('#desc').val();
    var token = $('#token').val();

    createGist(fileName, contents, desc, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
