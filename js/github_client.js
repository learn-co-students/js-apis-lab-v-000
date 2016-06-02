//define functions here
var createGist = function(file_name, content, description, token){
	console.log(file_name, content, description, token);
	
	var input = {
		"description": description,
		"public": true,
		"files": {}
	}
	input['files'][file_name] = {"content": content};
	
	$.ajax({
		url: "https://api.github.com/gists",
		type: "POST",
		dataType: 'json',
		beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
		data: JSON.stringify(input)
		}).done(function(response){
			console.log(response);
			myGists(response['owner']['login'], token)
		});
	
};

var myGists = function (username, token){
	
	$.ajax({
		url: "https://api.github.com/users/" + username + "/gists",
		type: "GET",
		dataType: 'jsonp'
	}).done(function(response){
			console.log(response);
			$('ul').html('');
			$.each(response.data, function(index, gist){
				var link = "<a href=\"" + gist["html_url"] + "\">" + gist["description"] + "</a>";
				$('ul').append("<li>" + link + "</li>");
			});
		});
	
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(event){
  	var token = $('#token').val();
  	var fn = $('#fn').val();
  	var content = $('#content').val();
  	var desc = $('#desc').val();
  
 		createGist(fn, content, desc, token);
  });
 
 
};

$(document).ready(function(){
	bindCreateButton();
});


//5e70fe1a18d28766feee06a6463318afa787713a