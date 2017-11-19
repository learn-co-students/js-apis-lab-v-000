//define functions here
var createGist = function(file_name, content, description, token){

var data = {
  'public' : true,
  'description' : description,
  'files' : {}
}
data['files'][file_name] ={
  'content' : content
};

$.ajax({
    url: 'https://api.github.com/gists',
    type : 'POST',
    dataType : 'json',
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
  $('button').on('click', function(){
    var token = $('#token').val;
    var file = $('#file').val;
    var description = $('#description').val;
    var content = $('content').val;
      createGist(file, content, description, token);
  });
  // call functions here

};

$(document).ready(function(){
  bindCreateButton();
});
