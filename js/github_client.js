//define functions here
var createGist = function(file_name, content, description, token) {

  var data = {
    description: description,
    public: true,
    files: {}
  };

  data.files[file_name] = { content: content };

  $.ajax({
      url: "https://api.github.com/gists",
      type: "POST",
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      },
      data: JSON.stringify(data)
    })

    .done(function (response) {
      myGists(response.owner.login, token);
    });

};

var myGists = function (username, token){

  $.ajax({
      url: "https://api.github.com/users/" + username + "/gists",
      method: "GET",
      dataType: "jsonp"
    })

    .done(function (response) {
      $("#gist_list").html("");
      console.log(response);
      response.data.forEach(addGist);
    });

};

var bindCreateButton = function (e) {
  // call functions here
  e.preventDefault();

  var description = $("#description").val(),
      file_name = $("#file_name").val(),
      content = $('#content').val(),
      token = $('#token').val();

  createGist(file_name, content, description, token);
};

function addGist(gist) {

  var gist = $('<li>').append(function () {
      return $('<a>')
        .attr('href', gist.html_url)
        .attr('target', '_blank')
        .text(gist.description);
    });

  $("#gist_list").append(gist);

}


$(document).ready(function () {

  $('#new_gist').on('submit', bindCreateButton );

});
