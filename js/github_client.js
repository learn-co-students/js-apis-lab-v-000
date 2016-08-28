
//define functions here

var createGist = function(file_name, content, description, token){
  var  myToken ="330946765add59f83604c5a493f0ee791a640861"
  var data = {
    'public': true,
    'description': description,
    'files': { }
  }; data['files'][file_name] = { 'content' : content};


  $.ajax({
    url: "https://api.github.com/gists",
    type: 'POST',
    dataType: 'JSON',
    data: JSON.stringify(data),
    headers: {
      Authorization: "token + myToken"
    }
  }).done(function(response){
    debugger;
    myGists(response['owner']['login'], token)
  })
};

var myGists = function (username, token){
    var  myToken ="330946765add59f83604c5a493f0ee791a640861"
    var data = {'owner': {} };
        data['owner'] = {'login': username };

  $.ajax({
    url: "https://api.github.com/gists",
    type: 'GET',
    dataType: 'JSON',
    data: JSON.stringify(owner),
    headers: {
      Authorization: "token + myToken"
    }
  })
};

var bindCreateButton = function() {
// call functions here
 var file_name = $("#name").val()
 var content = $("#content").val()
 var token = $("#token").val()
 var description = $("#description").val()
 $(button).on(click, function(event){
   event.stopPropagation()
   createGist(file_name, content, description, token);
   myGists(username, token);
 });
};

$(document).ready(function(){
});
