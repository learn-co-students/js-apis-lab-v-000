//define functions here
var myToken = "8a29749d8b37ba75c76c4bffb7b18bf31afd63c3";
var myUsername = "jsbenning";

var createGist = function(file_name, content, description, token) {
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    }
  })  
}

// $.ajax({
//   url: 'https://api.github.com/repos/rails/rails/stargazers',
//   type: 'GET',
// }).done(function(users) {
//   printStargazers(users);
// });

// var addHTML = function (html){
//   $('#search_results').html(html);
// };


var myGists = function (username, token) {


    // $.ajax({
    //   url: "https://api.github.com/users/" + username + "/gists", 
    //   type: 'GET', 
    //   dataType: 'json',
    //   data: 'data',
    //   headers: {
    //     Authorization: "token " + myToken
    //   } 
    // }).done(function(data) {
    //   if (data.length >= 1) {
    //     $('#links').append("<h3>Here Are Your Gist Links:</h3>");
    //     for (var i = 0; i < data.length; i++) {
    //       $('#links').append('<p><a href="' + data[i]['html_url'] + '">' + data[i]['description'] + '</a></p>');
    //     }
    //   }
    // })
    // .fail(function() {
    //   alert("Something broke!");
    // })
};

var bindCreateButton = function(e) {
  // call functions here
  e.preventDefault();

  // var myFilename = $('#file_name');
  // var myEnteredToken = ($('#token') || myToken);
  // var myDescription = $('#description');
  // var myContent = $('#content');

  //myGists(myUsername, myToken);
    //   $.ajax({
    //   url: "https://api.github.com/users/jsbenning/gists", 
    //   type: 'GET', 
    //   //dataType: 'json',
    //   data: 'data',
    //   headers: {
    //     Authorization: "token " + myToken 
    //   } 
    // }).done(function(data) {
    //   if (data.length >= 1) {
    //     $('#links').append("<h3>Here Are Your Gist Links:</h3>");
    //     for (var i = 0; i < data.length; i++) {
    //       $('#links').append('<p><a href="' + data[i]['html_url'] + '">' + data[i]['description'] + '</a></p>');
    //     }
    //   }
    // })
    // .fail(function() {
    //   alert("Something broke!" + myToken);
    // })



};

$(document).ready(function(){
    $("#create").on("click", function(e) {
      e.preventDefault();

      $.ajax({
      url: "https://api.github.com/users/jsbenning/gists", 
      type: 'GET', 
      dataType: 'json',
      data: 'data',
      headers: {
        Authorization: "token " + myToken 
      } 
    }).done(function(data) {
      if (data.length >= 1) {
        $('#links').append("<h3>Here Are Your Gist Links:</h3>");
        for (var i = 0; i < data.length; i++) {
          $('#links').append('<p><a href="' + data[i]['html_url'] + '">' + data[i]['description'] + '</a></p>');
        }
      }
    })
    .fail(function() {
      alert("Something broke!" + myToken);
    })
  })
});



//token: 8a29749d8b37ba75c76c4bffb7b18bf31afd63c3



