//define functions here
baseUrl ="https://api.github.com/"

var createGist = function(file_name, content, description, token){
   var data = {
     'description': description,
         'public': true,
        'files': {}
   };

   data['files'][file_name] = {
     'content': content
   };

   $.ajax({
     url: 'https://api.github.com/gists',
     type: 'POST',
     dataType: 'json',
     headers: {Authorization : "token " + token},
     //beforeSend: function(xhr) {
      //   xhr.setRequestHeader("Authorization", "token " + token);
      // },
    data: JSON.stringify(data)
     }).done(function(response) {
       console.log(response)
       myGists(response.owner.login, token)
   });
  };



/*var createGist = function(file_name, content, description, token){
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
    			'content': content }
    	}
    })
	}).done(function(response) {
    myGists(response.owner.login, token);
	});
};
*/
/*
  url = baseUrl + "gists";
  $.ajax({
    url : url,
    type : "POST",
    headers : {Authorization: "token " + token},
    dataType : 'json',
    data: JSON.stringify({
    'public' : true,
    'files': {
      [file_name] : {
        'content': content
      }
    },
    'description' : description});
  }).done(function(response) {
    return response;
  });
}
*/
var myGists = function (username, token){
  // clear the previous gist list before bringing it the updated one
  $('div#gist_list').html("");
  url = 'https://api.github.com/users/'+ username +'/gists'
  $.ajax({
    url: url,
    type: "GET",
    header: {Authorization: "token " + token},
    contentType : 'application/json',
    dataType: 'jsonp'
  }).done(function(gists) {
    console.log(gists)
    //response is an object with properties 'meta' and 'data'
    $.each(gists.data, function(index, gist) {
      var link = (index+1) +'. <a href="' + gist.html_url + '">' + gist. description + '</a><br>';
      $('div#gist_list').append(link);
    });
  });
}

var bindCreateButton = function() {
  // call functions here

  $('button#submit').on('click', function(event) {
    var token =  $('input#token').val();
    var content =  $('input#content').val();
    var description =  $('input#description').val();
    var file_name =  $('input#file_name').val();

    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
  bindCreateButton();
});
