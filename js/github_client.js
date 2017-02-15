//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    public: true,
    description: description,
    files: {}
  }

  data['files'][file_name] = {
    content: content
  }

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: "jsonp",
    headers: {
      authorizaton: "token" + token
    },
    data: JSON.stringify(data)
  }).done(function(data) {
    //data action
    myGists(data.owner.login, token)
  })

};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "jsonp",
    headers: {
      authorization: "token" + token
    }
  })..done(function(gists) {
    $.each(gists, function(index, gist) {
      var html_url = gist.html_url;
      var description = gist.description;
      var html = "";
      html += "<li><a href='" + html_url + "'>" + description + "</a></li>";
      $("#gistlist").append(html);
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $("#create").on("click", function(){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
  
});
