//define functions here
var createGist = function(file_name, content, description, token){
  var attributes = {}
  attributes["description"] = description;
  attributes["public"] = true,
  attributes["files"] = {};
  attributes["files"][file_name] = {};
  attributes["files"][file_name]["content"] = content;
  $.ajax( {
    url: "https://api.github.com/gists",
    data: JSON.stringify(attributes),
    type: "POST",
    dataType: 'json',
    headers: {
      Authorization: "token 6e7edd47e183210780c03bdba268b499005def4e"
    }
  }).done(function(response){
    myGists(response["owner"]["login"], token)
  }).fail(function(response){
    alert("Failed")
  })
};

var myGists = function (username, token){
  var query = "https://api.github.com/users/" + username+ "/gists"
  $.ajax ( {
    url: query,
    headers: {
      Authorization: "token 6e7edd47e183210780c03bdba268b499005def4e"
    },
    success: function(response) {
      $.each(response, function(index, value){
        var newEl = "<div><a href='"
            newEl += value["html_url"]
            newEl += "'>" + value["description"] + "</a></div>"
            $('#results').append(newEl);
      })
    }
  })
};

var bindCreateButton = function() {
  // call functions here
  $('#my_form').on('submit', function(e){
    e.preventDefault();
    var contents = $('#contents').val();
    var description = $('#description').val();
    var token = $('#token').val();
    var name = $('#name').val();
    createGist(name, contents, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});


 // 6e7edd47e183210780c03bdba268b499005def4e
