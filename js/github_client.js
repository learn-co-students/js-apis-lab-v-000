//define functions here
//token:a9236bb5c8ece34b4fe27067d2a5af29fabbd4dc
var createGist = function(file_name, content, description, token){

  var data = {
    "description": description,
    "public": true,
    "files": {}
  };

  data['files'][file_name] = {'content': content};

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response){
    myGists(response["owner"]["login"], token);
  }).fail(function(error){
    console.log(error);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: "GET",
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    }
  }).done(function(gists){
    $.each(gists.data, function(index, gist){
       var link = $("<a>")
         .attr("href",gist.html_url)
         .text(gist.description);

         var listItem = $("<li>")
          .append(link);

          $("#display_gists").append(listItem);
        })
    });
};

var bindCreateButton = function() {
  // call functions here
  $("#create").click(function(){
    var token = $("#personal_token").val();
    var description = $("#gist_description").val();
    var file_name = $("gist_filenamet").val();
    var contents = $("#gist_contents").val();
    debugger;
    createGist(file_name,contents,description,token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
