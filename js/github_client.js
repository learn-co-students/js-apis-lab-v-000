var createGist = function(file_name, content, description, token) {
  var url = 'https://api.github.com/gists'

  var data = {
    'public':   true,
    'description': description,
    'files': {
      [file_name]: {
        'content': content
      }
    }
  }

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

//   $.ajax({
//     url: url,
//     type: 'POST',
//     dataType: 'json',
//     beforeSend: function(xhr) {
//       xhr.setRequestHeader("Authorization", "token " + token);
//     }
//     data: (JSON.stringify(data)),
//     success: function(response) {
//       myGists(response.owner.login, token);
//     }
//   } );
//   myGists('fake login', token);
//   // myGists( 'genericlady', token );
// };

var myGists = function(username, token) {
  var githubURL = 'https://api.github.com/users/' + username + '/gists'

  $.ajax({
    url: githubURL,
    type: 'GET',
    dataType: 'jsonp',
    headers: {
      'Authorization': 'token ' + token
    },
    success: function(gists) {
      $('#gists').html('');

      jQuery.each(gists.data, function(index, gist) {
        var link = $('<a>')
          .attr('href', gist.html_url)
          .text(gist.description);

        var listItem = $('li')
          .append(link);

        $('#gists').append(listItem);
      })
    }
  } );
};

var bindCreateButton = function() {
  var newGistParameters = {};

  $('button').on('click', function(event) {
    var fields = $(':input').serializeArray();

    jQuery.each(fields, function(i, field) {
      newGistParameters[field['name']] = field['value'];
    } )
    createGist(newGistParameters);

  });
};

$(document).ready(function() {
  bindCreateButton();
});
