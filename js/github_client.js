"use strict";

//define functions here
function createGist(filename, content, description, token){
//alert("2. " + filename)
var idata = {};
idata[filename] = {"content" : content}


var data = {
    "public": true,
    "description": description,
    "files":  idata
    //  [filename]: {
    //    "content": content
    //  }

  }
  //alert(JSON.stringify(data))
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: "token a3369f66fc93aebc704c6b87f8c0237875a4762e"
    }
  }).done(function(gistdata){
//alert("success1")
    //alert(gistdata.owner.login + " and " + gistdata.id)
    myGists(gistdata.owner.login, token);
  })

};

var myGists = function (username, token){
  var outhtml = "";
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET'
  }).done(function(gistdata) {
//alert("success2")
    $.each(gistdata, function(i) {
        outhtml = outhtml + '<a href="' + gistdata[i].html_url +'"> ' + gistdata[i].description + '</a><br>'

    });
  //  alert(outhtml);
    $('#results').html(outhtml);
  });

};

var bindCreateButton = function() {
  // call functions here
  $('#createbtn').click(function(e) {
    var filename = $('#gistFName').val();
    var content = $('#gistContent').val();
    var description = $('#gistDesc').val();
    var token = $('#personaltoken').val();
//alert ("1. " + filename)
    createGist (filename, content, description, token);
  });
};

$(document).ready(function(){

  bindCreateButton();
});
