//define functions here
//var createGist = function(file_name, content, description, token){
function createGist(file_name, content, description, token){
 
 var data = {
 	"public": true,
    "description": description,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
    	Authorization: "token ee1a0f2ea919af1024624aa2847f52dc010d9c36"
	},
	success: function(result){
        console.log(result);
  	}
  });

  myGists('fake login', 'fake token');
  //myGists('brad72287', 'ee1a0f2ea919af1024624aa2847f52dc010d9c36');

};

var myGists = function (username, token){

	$.ajax({
		url: "https://api.github.com/users/"+username+"/gists", 
    	dataType: 'json',
    	headers: {
    		Authorization: "token ee1a0f2ea919af1024624aa2847f52dc010d9c36"
		},
		success: function(result){
        	console.log(result);
        	$("#result").append(result[0].html_ur);
        }
    });

};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(e){
  	e.preventDefault();
  	var file_name = $("#file_name").val();
  	var content = $("#content").val();
    var description = $("#description").val();
    var token = $("#token").val();
    createGist(file_name, content, description, token);
    //alert("do we get here?");
  })

};

$(document).ready(function(){
	bindCreateButton();
});
