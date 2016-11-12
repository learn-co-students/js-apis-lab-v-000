//define functions here
var createGist = function(file_name, content, description, token){
	console.log("createGist called?");
	console.log("file name?");
  	console.log(file_name);
  	console.log("content?");
  	console.log(content);
  	console.log("description?");
  	console.log(description);
  	console.log("token?");
  	console.log(token);
	var dataHash = {
	  	'description': description,
	  	'public': true,
	  	'files': {}
	  };
	dataHash['files'][file_name] = { 'content': content }
	var requestHash = {
	  url: 'https://api.github.com/gists',
	  type: 'POST',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  },
	  data: JSON.stringify(dataHash)
	};
	console.log("requestHash:");
	console.log(requestHash);
	$.ajax(requestHash).done(function(response) {
		console.log("does createGist succeed?");
		console.log(response);
		myGists(response.owner.login, token);
	}).fail(function(error) {
		console.log("I am error!");
		console.log(error);
	});
};

var myGists = function (username, token){
	console.log("is myGists ever called?")
	$.ajax({
	  url: 'https://api.github.com/users/' + username + '/gists',
	  type: 'GET',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  }
	}).done(function(gists) {
		console.log("does myGists succeed?");
		console.log(gists);
		displayGists(gists);
	}).fail(function(error) {
		console.log("I am error!");
		console.log(error);
	});
};

var displayGists = function(gists) {
	console.log("displayGists called?");
	var html = ""
	gists.forEach(function(gist){
  		html += "<a href='" + gist.url + "'><li>" + gist.description + "</li></a>";
  	});
  	console.log("Html:")
  	console.log(html)
  	$("#gists").html(html);
};

var bindCreateButton = function() {
  // call functions here
  $('#create-gist').on("click", function(event){
  	event.preventDefault();
  	var file_name = $('#file_name').val();
  	console.log("file name?");
  	console.log(file_name);
  	var content = $('#content').val();
  	console.log("content?");
  	console.log(content);
  	var description = $('#description').val();
  	console.log("description?");
  	console.log(description);
  	var token = $('#token').val();
  	console.log("token?");
  	console.log(token);
  	createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
	bindCreateButton();
});
