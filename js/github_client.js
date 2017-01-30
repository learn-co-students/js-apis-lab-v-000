//define functions here

var token = "8971378f99c3f36f5f8322ef875fa787"

var createGist = function(file_name, content, description, token){

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: JSON.stringify({})
    headers: {
      Authorization: "8971378f99c3f36f5f8322ef875fa787"
        "description": "the description for this gist",
        "public": true,
        "files": {
          "file1.txt": {
            "content": content
            "filename": file_name
            "description": description
            "token": token
        }
      }
    }
  })


};


var myGists = function (username, token){


};

var bindCreateButton = function() {
  // call functions here
    var token = $('#token').val();
    var gistName = $('#filename').val();
    var gistDesc = $('#gist_description').val()
    var gistContent = $('#gist_content').val()
  $('button').click(function(event){
    createGist(gistName, gistContent, gistDesc, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});


// https://api.github.com/gists
//     it('calls the github api with a post', function() {
//       spyOn($, "ajax").and.callFake(function (req) {
//         var d = $.Deferred();
//         d.reject({});
//         return d.promise();
//       });
//       createGist();
//       expect($.ajax.calls.argsFor(0)[0].url).toEqual('https://api.github.com/gists');
//       expect($.ajax.calls.argsFor(0)[0].type).toEqual('POST');
//     });
