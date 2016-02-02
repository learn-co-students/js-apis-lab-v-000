# GitHub API

## Objectives
+ Use Ajax to make a `get` request to an API
+ Use Ajax to make a `post` request to an API
+ Parse JSON to get clean API data

## Intro
For this lab we will be using the GitHub API to create and view Gists. In this lab you will create a UI that allows users to see a list of their gists and be able to create new ones.

## Instructions
You will need to visit https://github.com/settings/tokens and create a personal token to use. This token allows you to make request data for your account.

- Create the method `myGists(username, token)` that returns the gists for a user.
- Create the method `createGist(file_name, content, description, token)` that creates a public gist.

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
