//define functions here
var createGist = function(file_name, content, description, token){
	var input_data = {
		public: true,
		description: description,
		files: {
			}
	};
	input_data['files'][file_name] = {content: content}
	$.ajax({
  		url: 'https://api.github.com/gists',
  		type: 'POST',
  		data: JSON.stringify(input_data),
  		headers: {
    		Authorization: "token " + token
  		}
	})	
};

var myGists = function (username, token){
	var url = 'https://api.github.com/users/' + username + '/gists'
	$.ajax({
  		url: url,
  		type: 'GET',
  		dataType: 'json',
  		headers: {
    		Authorization: "token " + token
  		}
	}).done(function(data){
		var string = '';
		data.forEach(function(gist){
			string += '<a href=' + gist["html_url"] + ">" + gist["description"] + gist["owner"]["login"] + '</a></br>'
		})
		$("#content").html(string);
		
	})
}

var bindCreateButton = function() {
  $("input[name=submit]").on("click", function(event){
  	file_name = $("input[name=gist_file_name]").val();
  	content = $("input[name=gist_content]").val();
  	description = $("input[name=gist_description]").val();
  	token = $("input[name=personal_token]").val();
  	username = $("input[name=username").val();
  	createGist(file_name, content, description, token);
  	myGists(username, token);
  })

};

$(document).ready(function(){
	bindCreateButton();
});
