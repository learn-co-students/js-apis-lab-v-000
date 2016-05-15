var createGist = function(file_name, content, description, token){

  var data = {
    public: true,
    description: description,
    files: {}
  }

  data.files[file_name] = {
    "content": content
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: "POST",
    data: JSON.stringify(data),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    }
  }).done(function(response) {
    myGists(response.owner.login, token)
  })
};


var myGists = function (username, token){
  $.ajax({
    type: 'GET',
    url: "https://api.github.com/users/" + username + "/gists",
    dataType: 'json',
    success: function(data) {
      data.forEach(function(gist) {
        var str = "<p>" + "<a href=" + entry.html_url + ">" + gist.description + "</a>" + "</p>";
        $("h2").append(str);
      });
    }
  });
};

var bindCreateButton = function(e) {
  e.preventDefault()
  var file_name = $("#filename").val()
  var content = $("#contents").val()
  var description = $("#description").val()
  var token = $("#token").val()

  createGist(file_name, content, description, token)
};

$(document).ready(function(){
  $("input[type='submit']").on("click", bindCreateButton)
});