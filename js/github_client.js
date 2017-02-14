//define functions here

// var token = "41bd958c2dd2323c521cb315975813a9f647d760"

var createGist = function(file_name, content, description, token){
  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };

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

    $.each(gists.data, function(index, gist) {
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
  // call functions here
  $('#create').click(function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(file_name, content, description, token);
  });
};


$(document).ready(function(){
  bindCreateButton();
});


// https://api.github.com/gists
//     it('calls the github api with a post', function() {
//       spyOn($, "ajax").and.callFake(function (req) {
//         var d = $.Deferred();
//         d.reject({});
//         return d.promise();
//       });
//       createGist();
//       expect($.ajax.calls.argsFor(0)[0].url).toEqual('https://api.github.com/gists');
//       expect($.ajax.calls.argsFor(0)[0].type).toEqual('POST');
//     });
