//define functions here
var createGist = function(file_name, content, description, token){
  $.ajax({
    url: ('https://api.github.com/gists'),
    type: 'POST',
    data: JSON.stringify({ public: true, description: description, files: {
       'test_file.md' : { content : content }
     }}),
    headers: {
      Authorization: token
    }
  }).done(function(response){
    myGists('fake login', token)
  })
};

var myGists = function (username, token){
  $.ajax({
    url: ('https://api.github.com/gists/public'),
    type: 'GET',
    dataType: 'json'
  }).done(function(response) {
    console.log(response);
  })
};

var bindCreateButton = function() {
  // call functions here
    myGists('lynch16', '2f98cbaf4a1e7c8e050cf5e131d4cc0166bec318');
};

$(document).ready(function(){
  bindCreateButton();
});
