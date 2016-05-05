//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };

  data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(gist) {
    myGists(gist.owner.login, token);
  });
};


var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/"+username+"/gists",
    type: 'GET',
    dataType: 'jsonp',
    headers: {
      Authorization: token
    }
  }).done(function(gists){
    $.each(gists.data, function(index, gist) {
      var link = $('<a>').attr('href', gist.html_url);
      link.text(gist.description);
      var item = $('<p>').append(link);
      $('#gists').append(item);
    }) 
  })
};


var bindCreateButton = function() {
$('#create').click(function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(file_name, content, description, token);
  });
};


$(document).ready(function(){
  bindCreateButton();
});



// 03ad9fa7925f8e5258a8de6819fdcc2b28337ac1

// var url = 'https://api.spotify.com/v1/search';
 
// // These parameters will be made into url parameters by jQuery
// var url_params = {
//   q: "Take Me to Church",
//   type: "track",
//   limit: 10
// };
 
// var success_callback = function (searchResultsFromAPIRequest){
//   var tracks = searchResultsFromAPIRequest.tracks.items;
//   $.each(tracks, function(index, track) {
//     console.log("Song Found: " + track.name);
//   });
// };
 
// // The second parameter we are passing is the url parameters to use in the request
// $.getJSON(url, url_params, success_callback);