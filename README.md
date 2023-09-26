# Shrubs (Drupal Cypress Support Commands)

Common support commands for Cypress when interacting with Drupal.

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

### Drupal Cypress ckEditor set
Set the value of a ckeditor instance.
```
cy.ckeditorSet('#field_body-wrapper', 'hello world');
```

### Drupal Cypress drush
Runs Drush commands in multiple environments

Support running commands against Pantheon multidev environments as well.
```
cy.drush('status');
```

### Drupal Cypress login
Sets a default login but also passing custom login details

```
cy.login();cy.login('user', 'password');
```

### Drupal Cypress logout
Logs out of the current session
```
cy.logout();
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

### Drupal Cypress select item in media library
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

### Add this repository.

Add this repository to you composer.json repositories section.

```
{
 "type": "vcs",
 "url": "https://github.com/kanopi/shrubs"
}
```

### Require the project

`composer require kanopi/shrubs`

### Tell Cypress where to import the tests

In the `support` folder for where your Cypress tests are located, edit `commands.js` and add the
following:

```
// Import commands.js using ES2015 syntax:
import './shrubs/commands'
```

### To Ignore or not ignore, that is the....

In you `.gitignore` file, add the following to ignore this repository as it is
installed via composer.

`tests/cypress/cypress/e2e/shrubs`

However, I couldn't get the tests to install/run in CircleCI.  So I ended up 
not ignoring and committing these files.  This may not be a bad thing as the 
next time we add or update commands, the developer on the project will have the
option to update or not.


## Maintainers

Current maintainers:
 * [thejimbirch](https://www.drupal.org/u/thejimbirch)
 * [paulsheldrake](https://www.drupal.org/u/paulsheldrake)

This project is sponsored by:
 * [Kanopi studios](https://www.drupal.org/kanopi-studios)
