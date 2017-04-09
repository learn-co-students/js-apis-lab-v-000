//define functions here

var createGist = function(file_name, content, description, token){
  var data = {
    'public': true,
    'description': description,
    'files': {
      [file_name]: {
        'content': content
        }
      }
    }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token 1234" //removed token
    },
    data: JSON.stringify(data)
  }).done(function(results) {

    myGists(results.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
  url: 'https://api.github.com/users/' + username + '/gists',
  type: 'GET',
  dataType: 'jsonp',
  success: function(gists) {
    console.log("gists successfully pulled" + gists);
    var gistHtml = "";
    $.each(gists, function(index, gist){
      gistHtml += `<div class="gist"><h2><p>${gist.owner}<a href="${gist.html_url}">${gist.description}</a></p></div>`
    });
    $('#listGists').append("<div class=\"row\"><h2>My Gists:</h2>" + gistHtml + "</div>");
    }
  });
}

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var description = $('#description').val();
    var content = $('#content').val();

    createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});
