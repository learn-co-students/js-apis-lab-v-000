//define functions here
var createGist = function(file_name, content, description, token){

  var jsonString = {
    public: true,
    description : description,
    files : { } }

  jsonString['files'][file_name] =  { content : content }

  $.ajax({
      url: "https://api.github.com/gists",
      type: "POST",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      },
      data: JSON.stringify(jsonString)
  }).done(function(response) {
    console.log(response);
    myGists( response.owner.login, token);
  })
};

var myGists = function (username, token){
  $.ajax({
      url: "https://api.github.com/gists",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      }
  }).done(function(response) {
    console.log(response);
    $.each(response, function(index, gist) {
      var result = "<p><a href='" + gist.html_url + "'>" + gist.description + "</a></p>";
      $("#results").append(result);
    })
  })
};

var bindCreateButton = function() {
  var fileName = $("#file_name").val();
  var content = $("#content").val();
  var description = $("#description").val();
  var token = $("#token").val();
  createGist(fileName, content, description, token);
};

$(document).ready(function(){
  $("#create_gist").on("click", bindCreateButton);
});
