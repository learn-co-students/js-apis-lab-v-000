//define functions here
function createGist(file_name, content, description, token) {	
  $.ajax({ 
	  url: 'https://api.github.com/gists',
	  type: 'POST',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  },
	  data: JSON.stringify({
	    'public' : true,
	    'description' : description,
	    'files' : { 
	      [file_name] : {
	    	'content': content 
	      }
	    }
	  })
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};
	// GET /users/:username/gists //  // my token
function myGists(username, token) {
  $.ajax({ 
	  url: 'https://api.github.com/users/' + username + '/gists',
	  type: 'GET',
	  dataType: 'json',
	  headers: {
		  Authorization: "token " + token
	  }
  }).done(function(response) {
	  response.forEach(function(gist) {
		  $("#gist_links").append('<div><a href="' + gist.html_url + '">' + gist.description + '</a></div>');
	  });
  });
};

function bindCreateButton() {
  // call functions here
  var token = $('#token').val().trim();
  var content = $('#content').val().trim();
  var description = $('#description').val().trim();
  var file_name = $('#file_name').val().trim();
  createGist(file_name, content, description, token);
};

$(document).ready(function(){
  $('#create').on('click', function() { bindCreateButton(); })
  $('#get_gists').on('click', function() {
  	var username = $('#username').val().trim();
  	var token = $('#token').val().trim();
  	myGists(username,token);
  })
});