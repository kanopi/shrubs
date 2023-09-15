# Shrubs

## Contents of this file

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Maintainers


## Introductions

A set of default tests to get you jumpstarted configuring Cypress for Drupal.

## Requirements

* Cypress installed on your local or CI.
* @TODO Document how we have Cypress set up.


## Installation

### Install/update composer installers.

For Composer to understand your new `cypress-test` `install-type`, you need to
require the Composer Installer Extender package.

`composer require oomphinc/composer-installers-extender:2.0.1`

This package lets you define new install-types for Composer so it understands
where to place them in the file system when it encounters them

Next, you need to add two entries in composer.json for an install-type and its
path:

```
"installer-types": ["cypress-e2e"],
"installer-paths": {
 // existing entries omitted...
 "tests/cypress/cypress/e2e/{$name}": [
   "type:cypress-e2e"
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

In the `tests/cypress/cypress/support` folder, edit `e2e.js` and add the
following:

```
// Import commands.js using ES2015 syntax:
import '../e2e/shrubs/commands'
```

### TO Ignore or not ignore, that is the....

In you `.gitignore` file, add the following to ignore this repository as it is
installed via composer.

`tests/cypress/cypress/e2e/shrubs`

However, I couldn't get the tests to install/run in CircleCI.  So I ended up 
not ignoring and committing these files.  This may not be a bad thing as the 
next time we add or update commands, the developer on the project will have the
option to update or not.

## Configuration

 * @TODO Document how to use these commands.


## Maintainers

Current maintainers:
 * [thejimbirch](https://www.drupal.org/u/thejimbirch)
 * [paulsheldrake](https://www.drupal.org/u/paulsheldrake)

This project is sponsored by:
 * [Kanopi studios](https://www.drupal.org/kanopi-studios)
