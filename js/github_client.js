//define functions here
// {
//   "description": "the description for this gist",
//   "public": true,
//   "files": {
//     "file1.txt": {
//       "content": "String file contents"
//     }
//   }
// }

var createGist = function(file_name, content, description, token){
	var fileName = file_name;
	var fileObject = {};
	fileObject[fileName] = {content: content};
	var data = JSON.stringify({
		public: true, 
		description: description,
	 	files: fileObject
	 });

	$.ajax({
		url: 'https://api.github.com/gists',
		type: 'POST',
		dataType: 'json',
		data: data,
		headers: {
			Authorization: token
  		}
	}).done(function(results) {
		var username = results.owner.login;
		myGists(username, token);
	});
};

var myGists = function (username, token){
	var myGistsUrl = "https://api.github.com/users/" + username + "/gists"
	var successCallback = function(results) {
		console.log(results);
	}
	$.getJSON(myGistsUrl, successCallback);
};

var bindCreateButton = function() {
  // call functions here
  $('button#gist_button').click(function(event) {
  	var inputFileName = $('input#file_name').val();
  	var inputContent = $('input#content').val();
  	var inputDesc = $('input#description').val();
  	var inputToken = $('input#token').val();
  	createGist(inputFileName, inputContent, inputDesc, inputToken);
  });

};

$(document).ready(function(){
});


// {
//   "description": "the description for this gist",
//   "public": true,
//   "files": {
//     "file1.txt": {
//       "content": "String file contents"
//     }
//   }
// }
