var token = '35c1c56f5cf789654e09a575a3fd757517aba292';


//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'description': description,
        'public': true,
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
      console.log(response)
      myGists(response.owner.login, token)
  });
};


var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists){
    addHTML(gists);
  });


};
var addHTML = function (html){
  //$("#myGists").html("");
  $.each(html.data, function(index, gist){
    var link = $('<a>').attr('href', gist.html_url).text(gist.description);
    var list = $('<li>').append(link);
    $('#my_gists').append(list);
  });
   };
var bindCreateButton = function() {
  // call functions here
  $('#create_gist').click(function() {
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
