//define functions here
var createGist = function(file_name, content, description, token){
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
	$.ajax(requestHash).done(function(response) {
		return myGists(response.owner.login, token);
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
  	var content = $('#content').val();
  	var description = $('#description').val();
  	var token = $('#token').val();
  	var gists = createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
	bindCreateButton();
});
