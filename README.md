# GitHub API

## Objectives
+ Use Ajax to make a `get` request to an API
+ Use Ajax to make a `post` request to an API
+ Parse JSON to get clean API data

## Intro
For this lab we will be using the GitHub API to create and view Gists. In this lab you will create a UI that allows users to see a list of their gists and be able to create new ones.

## Instructions
You will need to visit [Github Tokens](https://github.com/settings/tokens) and create a personal token to use. This token allows you to request data for your account. Make sure you select "gists" from the checkboxes to allow your token to have access to that part of the Github API. Also, before you begin, visit [list a gist guide](https://developer.github.com/v3/gists/#list-a-users-gists) and [create a gist guide](https://developer.github.com/v3/gists/#create-a-gist) and review how to use the gist portion of the GitHub API.

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
beginning of the lab. To set the headers, you can pass the options
that you need to the [`headers`](http://api.jquery.com/jquery.ajax/) field in
your request options. An example is below:

``` javascript
$.ajax({
  url: 'GITHUB_URL_HERE',
  type: 'POST',
  dataType: 'json',
  headers: {
    Authorization: "token YOUR_TOKEN_HERE"
  }
})
```

## References
- https://developer.github.com/v3/gists/#create-a-gist
- https://developer.github.com/v3/gists/#list-a-users-gists
- http://api.jquery.com/jquery.ajax
- https://developer.github.com/v3/auth/

<p class='util--hide'>View <a href='https://learn.co/lessons/js-apis-lab'>Github API Lab</a> on Learn.co and start learning to code for free.</p>
