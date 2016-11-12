function createGist (file_name, content, description, token){
  var urlPost = "https://api.github.com/gists";
  var formData = {
    'description': description,
    'public': true,
    'files': {
      [file_name]: {
        'content': content
      }
    }
 }

  $.ajax({
    url: urlPost,
    data: JSON.stringify(formData),
    dataType: 'json',
    type: 'POST',
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(responseData) {
    myGists(responseData.owner.login, token);
  })

};//end createGist

var myGists = function (username, token){
  var urlGet = "https://api.github.com/users/";

  $.ajax({
    url: urlGet + username + "/gists",
    dataType: 'jsonp',
    type: "GET"
  }).done(function(responseData){

      if (responseData.data && responseData.data.length > 0){
        var html = `<h2>List of Gists</h2>`;
        html += "<ul>";
        $.each(responseData.data, function(i, gist){
          html += "<li>";
          html += `<a href="${gist.html_url}">`;
          html += gist.description;
          html += "</a>";
          html += "</li>";
        });
        html += "</ul>";
        $("#list-gists").html(html);
      }
    })//end done

};//end myGists

var bindCreateButton = function() {
  $("#submit").click(function(event){
    event.preventDefault();
    var description = $("#description").val();
    var token = $("#token").val();
    var content = $("#content").val();
    var name = $("#name").val();

    createGist(name, content, description, token)
  });
};//end bindCreateButton

$(document).ready(function(){
  bindCreateButton();
});
