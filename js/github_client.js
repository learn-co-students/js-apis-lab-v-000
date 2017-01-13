//define functions here
var createGist = function(file_name, content, description, token) {
  var gistData = {
    'public': false,
    'description': description,      
    'files': {
      file_name: {
        'content': content
      }
    }
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", `token ${token}`); 
    },
    data: JSON.stringify(gistData),
    dataType: 'json'
  }).done(function(response) {
      myGists(response.owner['login'], token);
  });
};

var myGists = function(username, token) {
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    success: function(data) {
      gistArray = [];
      var gists = $.each(data, function(key, gistInfo) {
        gistArray.push(`<li><a href="${gistInfo.html_url}">${gistInfo.description}</a></li>`);
      })
      $('#public-gists').html(`<h3>Gists for: ${username}</h3><ul>${gistArray.join("")}</ul>`);      
    }
  })
};

var bindCreateButton = function() {
  $('#gistSubmit').on('click', function(e) {
    var token = $('input[name="token"]').val();
    var file_name = $('input[name="file_name').val();
    var description = $('input[name="description"]').val();
    var content = $('input[name="content"]').val();

    e.preventDefault();
    createGist(file_name, content, description, token);
    $('#create-new-gist').each(function(){
      this.reset();
    });
  })

};

$(document).ready(function() {
  bindCreateButton();  
});
