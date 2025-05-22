![shrubs](https://github.com/kanopi/shrubs/assets/5177009/e0d0ed6e-7e08-43be-9c82-69119bb19ab5)

# Shrubs (Drupal Cypress Support Commands)

Common support commands for Cypress when interacting with Drupal.

*Table of Contents*
* [Requirements](#requirements) 
* [Installation](#installation) 
* [Available Commands](#available-commands)
* [Issues](#issues)
* [Maintainers](#maintainers) 

## Requirements

* Cypress installed on your local or CI.
* @TODO Document how we have Cypress set up.

## Installation

### Install/update composer installers.

Add two entries in composer.json for an install-type and its path:

```
"installer-types": ["cypress-support"],
"installer-paths": {
 // existing entries omitted...
 "tests/cypress/cypress/support/{$name}": [
   "type:cypress-support"
 ]
}
```

### Tell Cypress where to import the tests

In the `support` folder for where your Cypress tests are located, edit `commands.js` and add the
following:

```
// Import commands.js using ES2015 syntax:
import './shrubs/commands'
```

### Requiring Shrubs using Composer

The Shrubs repository is available via Packagist. 

Once you have completed the steps above, run the following command:

`composer require kanopi/shrubs`

### Update your CI process to...
@TODO (See what Paul did on Parks)

## Available Commands

### Drupal Cypress autocomplete
Will select the first match from an autocomplete field.
```
cy.autocomplete('input[data-drupal-selector="edit-field-episode-show-0-target-id"]', 'Term Name')
```

### Drupal Cypress ckEditor get
Gets the value of a ckeditor instance.
```
cy.ckeditorGet('#edit-body-wrapper').should('contain', 'hello world')
```

### Drupal Cypress ckEditor type
Set the value of a ckeditor instance.
```
cy.ckeditorType('#field_body-wrapper', 'hello world');
```

### Drupal Cypress drush
Runs Drush commands in multiple environments

Support running commands against Pantheon multidev environments as well.
```
cy.drush('status');
```

### Drupal Cypress login
Logins in through the default Drupal login form.
Sets a default login but also passing custom login details

```
cy.login(); // login as a default user.   
cy.login('user', 'password'); // as a specific user
```

Assuming there is some other process to create the user.

### Drupal Cypress login as a specific user
Uses a Drush one time login links to login as a specific user.
```   
cy.loginAsUser('myusername');
```

### Drupal Cypress logout
Logs out of the current session
```
cy.logout();
```

### Ajax Click

There a clicks that can generate a blocking ajax request. I.E. Opening modals or
slideouts that load content with an ajax request.

The function will wrap an intercept/wait combination around the click to make
sure the tests don't continue until the ajax request as completed.

It's also meant to deal with the anti-pattern of using [wait()](https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting) for clicks that trigger ajax requests.

**Example**
```
cy.ajaxClick("a.product-name", '/jsonapi/*/**')
```

This replaces code that would look like this.

```
const jsonApiRequest5 = 'jsonApiRequest' + Math.random();
cy.intercept('GET', '/jsonapi/*/**').as(jsonApiRequest5)
cy.get('a.product-name').click();
cy.wait('@' + jsonApiRequest5).its('response.statusCode').should('eq', 200)
```
or
```
cy.get('a.product-name').click();
cy.wait(5000)
```

### Drupal Cypress add item to media library
Uploads a file to the media library and selects it in the field.

Can optionally set the type of media uploaded if there is more than one type available.

Files are expected to be in the `fixtures` folder at the same level as `support` and
`e2e`.  In most cases, that will be `/tests/cypress/cypress/fixtures`.
```
cy.mediaLibraryAdd('#field_media_assets-media-library-wrapper', 'sample.png');
cy.mediaLibraryAdd('#field_media_assets-media-library-wrapper', 'sample.mp3', 'audio');
```

### Drupal Cypress select item in the media library
Open a media browser modal and selects an existing media item

Can optionally set the type of media uploaded if there is more than one type available.

Files are expected to be in the `fixtures` folder.

```
cy.mediaLibrarySelect('#field_media_assets-media-library-wrapper', 'sample.png');
cy.mediaLibrarySelect('#field_media_assets-media-library-wrapper', 'sample.png', 'image');
```

### Drupal Cypress upload file
Upload a file through a file field
Files should be in the `fixtures` folder.
```
cy.uploadFile('#file-field-wrapper', 'example.png');`
```

### logAndStore(message)
Logs a message and stores it in an internal array to be retrieved later using
`cy.logSummary();`

```
cy.logAndStore('This is a log message.');
```

### logSummary()

Outputs all stored log messages at the end of a test run.

```
cy.logSummary();
```

Example with after() Hook
```
describe('Example Test with log summary', () => {
  beforeEach(() => {
    cy.visit('/example-page');
  });

  it('should log multiple steps', () => {
    cy.logAndStore('Step 1: Visiting the page.');
    cy.logAndStore('Step 2: Clicking a button.');
    cy.logAndStore('Step 3: Validating output.');
  });

  after(() => {
    cy.logSummary();
  });
});
```

## Issues
For issues and support, please use the issue queue at https://www.drupal.org/project/issues/shrubs?categories=All

## Maintainers

Current maintainers:
 * [thejimbirch](https://www.drupal.org/u/thejimbirch)
 * [paulsheldrake](https://www.drupal.org/u/paulsheldrake)

This project is sponsored by:
 * [Kanopi studios](https://www.drupal.org/kanopi-studios)
