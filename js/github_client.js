//define functions here
//token
var token = 'e5c8ababa4009ee0ea409add30255eb2b3f24ceb'

var createGist = function(file_name, content, description, token){
	var files = {};
	files[file_name] = {"content": content};
	$.ajax({
		url: "https://api.github.com/gists",
		type: "POST",
		dataType: "JSON",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "token " + token);
		},
		data: JSON.stringify({ public : true, description : description, files : files})
	}).done(function(response){
		myGists(response.owner.login, token);
	});

};

var myGists = function (username, token){
	$.ajax({
		url: "https://api.github.com/users" + username + "/gists",
		type: "GET",
		dataType: "JSON",
		success: function(result){
			$.each(result, function(i, result){
				$("#user-info").append('<li>' + gist.description + '</li>');
			});
		}
	});
};

var bindCreateButton = function() {
  // call functions here
  $('#create-gist').click(function(event){
  	var token = $('#token').val();
  	var file_name = $('#file_name').val();
  	var description = $('#description').val();
  	var content = $('#content').val();
  	createGist(file_name, content, description, token);
  })

};

$(document).ready(function(){
	bindCreateButton();
});
