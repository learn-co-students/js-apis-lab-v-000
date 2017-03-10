//define functions here
var createGist = function(file_name, content, description, token){

  var dataForAjax = {
    "description": description,
    "public": true,
    "files": { }
  };

  dataForAjax["files"][file_name] = {"content": content}

  $.ajax({
    url: 'https://api.github.com/gists',
	  type: 'POST',
	  dataType: 'json',
	  headers: {
      Authorization: "token " + token
      },
      data: JSON.stringify(dataForAjax)
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
 $("#submitButton").on("click", function(event){
 	  var token = $("#token").val();
 	  var file_name = $("#gistFileName").val();
 	  var description = $("#gistDescription").val();
 	  var content = $("#gistContents").val();
    createGist(file_name, content, description, token)
  	});
};

$(document).ready(function(){
 bindCreateButton();
});
