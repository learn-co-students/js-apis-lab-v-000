//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    public: true,
    files: {},
    description: description
  };

  data.files[file_name]={content: content};

  $.ajax({
    datatype: "json",
    url: "https://api.github.com/gists",
    data: JSON.stringify(data),
    type: "POST",
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token " + token);
    }
  }).done(function(response) {
    myGists(response.owner.login, token);
  }).fail(function(response) {
    console.log("fail");
  })
};

var myGists = function (username, token){
  $.ajax({
    datatype: "json",
    url: "https://api.github.com/users/" + username + "/gists",
    data: {access_token: token}
  }).done(function(gists){
    $("#gists").html("");
    $.each(gists, function(index, gist){
      $("#gists").append('<a href="' + gist.html_url + '">' + gist.description + '</a>');
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  var file_name = $('#file_name').val(),
      content = $('#content').val(),
      description = $('#description').val(),
      token = $('#token').val();
  createGist(file_name, content, description, token);
};

$(document).ready(function(){
  $('#create').on('click', bindCreateButton);
});
