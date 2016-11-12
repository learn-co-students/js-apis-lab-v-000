//define functions here
var createGist = function(file_name, content, description, token){
	console.log("are we even hitting createGist?");
	var dataHash = {
	  	'description': description,
	  	'public': true,
	  	'files': {}
	  };
	dataHash['files'][file_name] = { 'content': content }
	console.log("Do we have a dataHash?");
	console.log(dataHash);
	var requestHash = {
	  url: 'https://api.github.com/gists',
	  type: 'POST',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  },
	  data: JSON.stringify(dataHash)
	};
	console.log("Do we have a requestHash?");
	console.log(requestHash);
	$.ajax(requestHash).done(function(response) {
		console.log("Does the createGist ajax request succeed?");
		console.log("Does myGists exist in createGist?");
		console.log(myGists);
		var gists = myGists(response.owner.login, token);
		console.log("Are the Gists in createGist?")
		console.log(gists);
		return gists;
	}).fail(function(error) {
		console.log("I am error!");
		console.log(error);
	});
};

var myGists = function (username, token){
	$.ajax({
	  url: 'https://api.github.com/users/' + username + '/gists',
	  type: 'GET',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  }
	}).done(function(gists) {
		return gists;
	}).fail(function(error) {
		console.log("I am error!");
		console.log(error);
	});
};

var bindCreateButton = function() {
  // call functions here
  $('#create-gist').on("click", function(event){
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
  	console.log("Does createGist exist in bindCreateButton?")
  	console.log(createGist);
  	console.log("Let's see what a createGist call returns");
  	console.log(createGist(file_name, content, description, token));
  	var gists = createGist(file_name, content, description, token);
  	var html = "";
  	console.log("Do the gists now exist in bindCreateButton?")
  	console.log(gists);
  	gists.forEach(function(gist){
  		console.log(gist);
  		html += "<a href='" + gist.url + "'><li>" + gist.description + "</li></a>";
  	});
  	console.log(html);
  	$("#gists").html(html);
  });
};

$(document).ready(function(){
	bindCreateButton();
});
