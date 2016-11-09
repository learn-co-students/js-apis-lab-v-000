//define functions here

var token = "7682ac32d3379c3c9333be556e4911c5bb1d885a";

function createGist(file_name, content, description, token){
  var data = {
    'public' : true,
    'description' : description,
    'files' : {}
  }
  data['files'][file_name] = {
    'content' : content
  };

  $.ajax({
    url: "https://api.github.com/gists",
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    error: function(xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
    },
    success:
  });
}

function myGists(username, token) {
  var username = $('#username').val();
  var url = "https://api.github.com/users/" + username + "/gists";
   $.ajax({
     url: url,
     type: 'GET',
     success: function(result){
       $.each(result, function(index, value){
         $('#user_gists').append('<li>'+ value.url + '</li>');
       })
     }
   })
  };


var bindCreateButton = function() {
  // call functions here
  $('#submit').click(function() {
    var token = $("#token").val();
    var file_name = $("#file_name").val();
    var content = $("#content").val();
    var description = $("#description").val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  createGist;
});
