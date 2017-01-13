//define functions here
//access token: ad3eb1754839e6fd7c73fcdc317430b98c10d0d7

var baseURL = "https://api.github.com/"

var createGist = function(file_name, content, description, token){

  const newGist = {
    'description': description,
    'public': true,
    'files': {},
  }

  newGist["files"][file_name] = { "content": content}

  $.ajax({
    url: baseURL + "gists",
    type: 'POST',
    data: JSON.stringify(newGist),
    //dataType: 'jsonp',
    headers: {
      Authorization: "token " + token
    }
  }).done(function(gist) {
    myGists(gist.owner.login, token)
  })
};

var myGists = function(username, token){
  var url =  baseURL + "users/" + username + "/gists"
  $.ajax({
    url: url,
    type: 'GET',
    //dataType: 'jsonp',
    headers: {
      Authorization: "token " + token
    }
  }).done(function(gists) {
    //return gists
    //$.each(gists, function(index, gist) {
    //  $('#your_gists').append(`<li>${gist.description}</li>`)
    //})
    $('#myGists').html('');

    $.each(gists.data, function(index, gist) {
      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);

      var listItem = $('<li>')
        .append(link);

      $('#myGists').append(listItem);
  })
};

var bindCreateButton = function() {
  $('#create_gist').on('click', function() {
    var file_name = $('#filename').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();

    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton()
});
