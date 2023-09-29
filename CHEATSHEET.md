# Shrubs Cypress Commands Cheatsheet

## Administration

* Log into Drupal

cy.login();  // Logins as the default testing user.
cy.login('username', 'password'); // login as a specific user.

* Go to a page
cy.visit()

## Creating a Node
* Go to a node add form
cy.visit('/node/add'); // Replace with the actual URL of your content

* Fill out a text field
cy.get('#id-selector').type(enter-string);

* Choose a select list option
    cy.get('#id-selector').select('option');

* Choose a radio or checkbox
** In Cypress, you can interact with radio buttons and checkboxes on a Drupal site using the .check() and .click()
    cy.get('#id-selector').click();

* Choose an autocomplete
** Use Cypress autocomplete command will select first option that appears for autocomplete
Cypress.Commands.add("autocomplete", (selector, content) => {
  cy.get(selector).type(content).then(($input) => {
    cy.get('.ui-autocomplete:visible a:first').click();
  });
});


* Fill out a rich text editor field
** Use ckeditorType command 
Cypress.Commands.add("ckeditorType", (selector, content) => {
  cy.document().then((doc) => {
    const updatedSelector = selector + ' .ck-editor__editable';
    const domEditableElement = doc.querySelector( updatedSelector );
    const editorInstance = domEditableElement.ckeditorInstance;
    editorInstance.setData( content );
  })
});

* Create a Paragraph
cy.visit('/node/123/edit');

cy.get('.add-paragraph-button').click();

cy.get('#edit-paragraph-field-name').type('My Paragraph Name');
// Fill in other paragraph fields here

cy.get('#edit-submit').click();

* Preview a node
** Need to test this example code and validate it works
cy.visit('/node/123/edit');

cy.get('.preview-button').click();

// Verify that you are in preview mode
cy.contains('Preview Mode').should('be.visible');

// Perform actions or assertions in preview mode

* Save a node
cy.visit('/node/add/page');

// Fill in node fields
cy.get('#edit-title-0-value').type('Test Node Title');
cy.get('#edit-body-0-value').type('This is the content of the test node.');

cy.get('#edit-submit').click();

// Verify that the node has been successfully saved
cy.contains('The content has been saved.').should('be.visible');

* Change a node's path
// Visit edit page for node 
cy.visit('/node/123/edit');

// Select URL Alias tab and enter in new path alias
cy.get('#edit-path-0-alias').clear().type('new-path-alias');

cy.get('#edit-submit').click();

// Verify that the node's path alias has been successfully changed
cy.url().should('include', '/new-path-alias');

* Add a node to a menu
// Visit edit page of node
cy.visit('/node/123/edit');

// Click on Menu settings tab
cy.get('.menu-settings-details summary').click();

// Select what menu you want it to be a part of
cy.get('#edit-menu-parent').select('Main Menu');
// Fill in other menu fields

// Save changes to node menu
cy.get('#edit-submit').click();

* Include/Exclude a node from a Sitemap

* Uploading a file

* Choosing a file from a media library

* Change Revision state

* Add to a menu

* Schedule a publishing time

* Schedule an unpublishing time.

* Write a revision log message
