# GitHub API

## Objectives
+ Use Ajax to make a `get` request to an API
+ Use Ajax to make a `post` request to an API
+ Parse JSON to get clean API data

## Intro
For this lab we will be using the GitHub API to create and view Gists. In this lab you will create a UI that allows users to see a list of their gists and be able to create new ones.

## Instructions
You will need to visit https://github.com/settings/tokens and create a personal token to use. This token allows you to request data for your account. Also, before you begin, visit https://developer.github.com/v3/gists/#list-a-users-gists and https://developer.github.com/v3/gists/#create-a-gist and review how to use the gist portion of the GitHub API.

- Create the method `myGists(username, token)` that returns the gists for a user.
- Create the method `createGist(file_name, content, description, token)` that creates a public gist.
- Create the method `bindCreateButton` that will bind the click event
  for the button that makes our request.

### User Interface
With your code ready to go, create the UI.
- Create a form for the user to enter
  - Personal token.
  - Gist file name.
  - Gist description.
  - Gist contents.
- Have a button that when clicked
  - Creates a public gist for a user.
  - Updates the UI to show the list of public gists for the user.
    - Use the `html_url` for the href and the description from the gist
      as the link text.

### Hint
The GitHub API requires you to send a token as part of the request
headers. This token will be the personal token you created in the
beginning of the lab. In order to set the headers you will need to
provide a function to the `beforeSend` option of the `$.ajax` request.
This function accepts a parameter of type [jqXHR](http://api.jquery.com/Types/#jqXHR) which we then call `setRequestHeader` to set the `Authorization` header. Below is an example of this configuration.

```javascript
  $.ajax({
    url: 'GitHub URL HERE',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token PERSON-TOKEN-HERE");
    },
```

## References
- https://developer.github.com/v3/gists/#create-a-gist
- https://developer.github.com/v3/gists/#list-a-users-gists
- http://api.jquery.com/jquery.ajax
- https://developer.github.com/v3/auth/
