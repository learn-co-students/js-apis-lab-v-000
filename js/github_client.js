//define functions here
var myToken = "token 1329ac976e2d5b9e288eb292782175a040ecd9b2";

var createGist = function(file_name, content, description, token) {
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    }
    "description": description,
    "public": true,
    "files": {
      file_name: {
      "content": content
      }
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
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: 'GET',
    headers: {
      Authorization: token
    }
  }).done(function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj);
  })
};

var bindCreateButton = function(event) {
  // call functions here
  event.preventDefault();
  
    $.ajax({
      url: "https://api.github.com/users/" + "jsbenning" + "/gists", 
      type: 'GET', 
      //dataType: 'json', 
      data: 'data',
      headers: {
        Authorization: myToken
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
      alert("Something broke!");
    })
};

$(document).ready(function(){
    $("#create").on("click", bindCreateButton)
});



//token: 1329ac976e2d5b9e288eb292782175a040ecd9b2

// $.ajax({
//   url: 'https://api.github.com',
//   type: 'POST',
//   dataType: 'json',
//   headers: {
//     Authorization: "1329ac976e2d5b9e288eb292782175a040ecd9b2"
//   }
// })

// var printStargazers = function(users) {
//   $.each(users, function(index, user) {
//     console.log(user.login + ' starred the Rails Repository');
//   });
// };


// $.ajax({
//   url: 'https://api.github.com/repos/rails/rails/stargazers',
//   type: 'GET',
// }).done(function(users) {
//   printStargazers(users);
// });

// var addHTML = function (html){
//   $('#search_results').html(html);
// };

// var bindCreateButton = function (){
//   $('#convert').click(function(event) {
//     var markdown = $('#markdown').val();
//     $.ajax({
//       url: 'https://api.github.com/markdown',
//       type: 'POST',
//       data: JSON.stringify({ text: markdown, mode: "markdown" })
//     }).done(function(response) {
//       addHTML(response);
//     });
//   });
// };

// $(document).ready(function(){
//   bindCreateButton();
// });