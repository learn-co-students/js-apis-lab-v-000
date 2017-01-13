//define functions here
var createGist = function(file_name, content, description, token){
  	
	// var data = {
	//     'public':   true,
	//     'description': description,
	//     'files': {}		
	// };

	// data.files.file_name = {
	// 	'content': content
	// };

// Hardcoded Data. At the time of this submission, this is what works properly.
    var data = {
	  "description": "Hardcoded Description",
	  "public": true,
	  "files": {
	    "file1.txt": {
	      "content": "String file contents"
	    }
	  }
	}

	$.ajax({
		url: 'https://api.github.com/gists',
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(data),
		headers: {
			Authorization: "token " + token
		}
		// beforeSend: function(xhr) {
		// 	xhr.setRequestHeader("Authorization", "token " + token);
		// },
	}).done(function(response) {
		myGists(response.owner.login, token);
	}).fail(function(response){
        console.log(response);
    });
};

var myGists = function (username, token) {
	$.ajax({
		url: "https://api.github.com/users/" + username + "/gists",
		type: "GET", 
		dataType: "jsonp"
	}).done(function(gists) {
		$.each(gists, function(index, gist) {
			var link = $("<a>").attr('href', gist.html_url).text(gist.description);
			var html = $("<li>").append(link);
			$('#myGists').append(html);
		});
	});
};

var bindCreateButton = function() {
	// call functions here
	$('#createButton').on("click", function(event) {
		// var token = $('#token').val();
		var token = "e2d5f2bbbd7182aacc5deeab2093f55041009a23";
		var file = $('#file').val();
		var description = $('#description').val();
		var content = $('#content').val();

		createGist(file, content, description, token);
	});
};

$(document).ready(function(){
	bindCreateButton();
});
