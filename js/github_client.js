//define functions here
var createGist = function(file_name, content, description, token){
	
	var input = {
		'public': true,
		'description': description,
		'files': {}
	}

	input['files'][file_name] = {
		'content': content
	} 

	$.ajax({ 
    	url: 'https://api.github.com/gists',
    	type: 'POST',
    	dataType: 'json',
  		beforeSend: function(xhr) { 
        	xhr.setRequestHeader("Authorization", "token " + token); 
    	},
    	data: JSON.stringify(input)
		}).done(function(response) {
    		myGists(response.owner.login, token);
		});
};

var myGists = function (username, token){
	$.ajax({ 
    	url: 'https://api.github.com/'+username+'/gists',
    	type: 'GET',
    	dataType: 'json'
	}).done(function(response) {
    	$('#myGists').html('');

    	$.each(response.data, function(index, gist){
    		var link = $('<a>').attr('href', gist.html_url).text(gist.description);
    		var lI = $('<li>').append(link);
 			$('#myGists').append(lI);
    	} )
	});
};

var bindCreateButton = function() {
  $('#create').on('click',function(){
  	var file_name = $('#filename').val();
  	var content = $('#content').val();
  	var description = $('#description').val();
  	var token = $('#token').val();
  	createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
	bindCreateButton();
});


