var createGist = function(file_name, content, description, token){
	var gist = {
		description: description,
		public: true,
		files: {}
	}

	gist.files[file_name] = { content: content};

	$.ajax({
		url: 'https://api.github.com/gists',
		type: 'POST',
		dataType: 'json',
		headers: { Authorization: token },
		data: JSON.stringify(gist)
	}).done(function(newGist){
		myGists(newGist.owner.login, token)
	})
};

var myGists = function (username, token){
	 $.ajax({
	 	url: `https://api.github.com/users/${username}/gists`,
	 	type: 'GET',
	 	dataType: 'jsonp'
	 }).done(function(gists){
	 	var list = '<ul>'

	 	$.each(gists, function(index, gist){
	 		list += `<li><a href=${gist.html_url}>${gist.description}</a></li>`;
	 	});// .each end
	 	list+= '</ul>'
	 }) //.done end
	 $('#gists').append(list);
	}; //function end

var bindCreateButton = function() {
	debugger
  $('#submit').on('click', function() {
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();

    createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
	bindCreateButton()

});

// token: 60f8c8cd83b7d416764e880bc058317eef3a7752