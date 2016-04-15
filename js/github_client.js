//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": description,
    "files": {
    }
  };
  data.files[file_name] = {
    "content": content
  };
  
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
    Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({
            url: "https://api.github.com/users/" + username + "/gists",
            type: 'GET',
            dataType: 'json',
            success: function(data) {
              // debugger;
              // add data to dom
              // map over data
              // data[0].html_url
              // data[0].description


              data.forEach(function(entry) {
                var str = "<p>Description:" + entry.description + "  Link: " + entry.html_url + "</p>";
                $("body").append(str);
              });
            }
          });
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
  // myGists("dhh", "none")
  $("#button").click(function() {
    var token = $("#token").val();
    var fileName = $("#file_name").val();
    var description = $("#description").val();
    var contents = $("#contents").val();
    createGist(fileName, contents, description, token);
  });
});
