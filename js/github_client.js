//var username = "adamking0126";
//var token = "36001cf167cd680e2b9e3a9477ad1a4e677e4d91";

var createGist = function(file_name, content, description, token){
  //build the data hash
  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };

  //because there can be more than one file (but we only have one in this case)
  data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    //this function turns the structure into a json string
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};


var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#myGists').html('');
    console.log("printing gists");

    $.each(gists.data, function(index, gist) {
      console.log("in the iteration");
      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);

      var listItem = $('<li>')
        .append(link);

      $('#myGists').append(listItem);
    })
  });
};

var bindCreateButton = function() {
  $('#submit').on("click", function() {
    var token = $('#token').val();
    var file_name = $('#filename').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
  bindCreateButton();
});
