//define functions here

//called in button click event and calls myGist to add new gist to page
var createGist = function(file_name, content, description, token){
  var gist = {
    'public':   true,
    'description': description,
    'files': {}
  };

  gist['files'][file_name] = {'content': content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: { Authorization: "token " + token },
    data: JSON.stringify(gist)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

//get my gists and list them
var myGists = function(username, token) {
    $.ajax({
        url: "https://api.github.com/users/" + username + "/gists",
        type: 'GET',
        dataType: 'json'
    }).done(function(gistList) {
        $('#listOfGists').html('');

        $.each(gistList.data, function(index, g) {
            var a = $('<a>').attr('href', g.html_url).text(g.description);
            var li = $('<li>').append(a);
            $('#listOfGists').append(li);
        });
    });
};
// on button click call createGist using jquery to extract the values
var bindCreateButton = function() {
    $('button').click(function() {
        createGist($("#filename").val(), $("#content").val(), $("#description").val(), $("#token").val());
    });
};

$(document).ready(function() {
    bindCreateButton();
});
