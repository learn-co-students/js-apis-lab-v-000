//define functions here
var createGist = function(file_name, content, description, token){
	var data = {
		'public': true,
		'description' : description,
		'files': {}
	};
	data['files'][file_name] = {
		'content': content
	};

	$.ajax({
		url: "https://api.github.com/gists",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(data),
		headers: {
			Authorization: `token ${token}`
		}
	}).done(function(response) {
		myGists(response.owner.login, token);
	});
};

var myGists = function (username, token){
	$.ajax({
		url: "https://api.github.com/users/" + username + "/gists",
		type: 'GET',
		dataType: 'json',
		headers: {
			Authorization: `token ${token}`
		}
	}).done(function(gists) {
		$.each(gists, function(index, gist) {
			$('#myGists').append(`<li>
				<a href="${gist.html_url}">${gist.description}</a>
				</li>`
			)
		})
	});
};

var bindCreateButton = function() {
  // call functions here
	var token = $('#gistToken').val();
	var file_name = $('#gistFileName').val();
	var description = $('#gistDescription').val();
	var contents = $('#gistContents').val();
	createGist(file_name, contents, description, token);
};

$(document).ready(function(){
});
