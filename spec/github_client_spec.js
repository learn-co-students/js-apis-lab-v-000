// describe('js-apis-lab', function() {
//   var expectedData;
//   var fakeGist;
//
//   beforeEach(function() {
//     expectedData = null;
//     fakeGist = {
//       owner: {
//         login: 'fake login'
//       }
//     };
//
//   });
//
//   describe('calling createGist', function() {
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
//
//     it('sends the correct data', function() {
//       spyOn($, "ajax").and.callFake(function (req) {
//         var d = $.Deferred();
//         d.reject({});
//         return d.promise();
//       });
//
//       expectedData = {
//         'public':   true,
//         'description': 'test description',
//         'files': {
//           'test_file.md': {
//             'content': 'fake content'
//           }
//         }
//       };
//       spyOn(JSON, 'stringify').and.returnValue('fakeString');
//
//       createGist('test_file.md', 'fake content', 'test description', 'fake token');
//
//       expect($.ajax.calls.argsFor(0)[0].data).toEqual('fakeString');
//       expect(JSON.stringify.calls.argsFor(0)[0]).toEqual(expectedData);
//     });
//
//     it('calls done', function() {
//       spyOn($, "ajax").and.callFake(function (req) {
//         var d = $.Deferred();
//         d.resolve(fakeGist);
//         return d.promise();
//       });
//
//       spyOn(window, 'myGists')
//
//       createGist('test_file.md', 'fake content', 'test description', 'fake token');
//
//       expect(window.myGists).toHaveBeenCalledWith('fake login', 'fake token');
//     });
//   });
//
//
// });
