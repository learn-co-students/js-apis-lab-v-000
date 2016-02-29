var token = '0816d12ac5b2b1b82fb6c7b8d1e2219a81b9f0ac'

//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'public': true,
    'description' : description,
    'files' : {}
  };

  data['files'][file_name] = {
    "content": content
  };
  
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
    // Clear list
    $("#myGists").html("");

    // Iterate through each gist
    $.each(gists.data, function(index, gist) {
      // Create html link
      var link = $('<a>', {
        text: gist.description,
        href: gist.html_url
      });
      // Append link to list
      var listItemTag = $('<li>').append(link);
      $('#myGists').append(listItemTag);
    })
  })
};

var bindCreateButton = function() {
  $('#create_gist').on('click', function(event) {
    var token = $('#token').val();
    var name = $('#title').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
