//define functions here
function createGist(file_name, content, description, token) {
  var thisIsAFile = file_name;
  var info = {};
  info[thisIsAFile] = {content: content};
  var data = JSON.stringify({
    public: true,
    description: description,
    files: info
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
    var name = results.owner.login
    myGists(name, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/${username}/gists' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $('#gists').html('');

    $.each(gists.data, function(index, gist) {
      var link = "<a href='" + gist.html_url + "'>" + gist.description + "</a>"

      var listItem = $('<li>').append(link);

      $('#gists').append(listItem);
    })
  });
 };

// var myGists = function (username, token){
//   var getThatUrl = 'https://api.github.com/users/' + username + '/gists';
//
//
//   var itWorked = function(results) {
//  		console.log(results);
//  	}
//  	$.getJSON(getThatUrl, itWorked);
//
//   $.ajax({
//    url: `https://api.github.com/users/${username}/gists`,
//    type: 'GET',
//    headers: {
//     Authorization: `token ${token}`
//    }
//   }).done(function(gists) {
//    $.each(gists, function(index, gist) {
//     $('#gists').append($(`<li><a href="${gist.html_url}">${gist.description}</a></li>`));
//   });
//   });
//
// };



var bindCreateButton = function() {
  $('#submit').click(function() {
      var file_name = $('#file_name').val();
      var description = $('#description').val();
      var content = $('#content').val();
      var token = $('#token').val();
    createGist((file_name, content, description, token));
  });
};

$(document).ready(function(){
  bindCreateButton();

});
