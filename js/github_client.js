var base_url = 'https://api.github.com';

var myGists = function (username, token){
  var url = base_url + '/users/' + username + '/gists';
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    headers:{
      Authorization: "token " + token
      }
    }).done(function(gists){
      $.each(gists['data'], function(i, v){
        $('#gists').append('<li><a href=' + v['html_url'] +  '>' + v['description'] + '</a></li>')
      });
  });
}

//define functions here
var createGist = function(file_name, content, description, token){
  var data = {};
  var innerData = {};
  innerData[file_name] = {"content": content};
  data["public"] = true;
  data["description"] = description;
  data["files"] = innerData;

  $.ajax({
      url: base_url + '/gists',
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: "token " + token
      },
      data: JSON.stringify(data)
      }).done(function(response){
          myGists(response.owner.login, token);
        });
};

var bindCreateButton = function() {
  $('#GISTIFY').on('click', function(){
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(file_name, content, description, token)
  });
};

$(document).ready(function(){
  bindCreateButton()
});
