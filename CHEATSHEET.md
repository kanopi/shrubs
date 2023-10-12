# Shrubs Cypress Commands Cheatsheet

## Administration

* Log into Drupal
[Link to login.js](login.js)
cy.login('User', 'pass')

* Logout 
[Link to logout](logout.js)
cy.logout()

* Go to a page
cy.visit('/path')

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
[Link to autocomplete](autocomplete.js)
cy.autocomplete('[data-drupal-selector="edit-field-sample-0-target-id"]', 'item');

* Fill out a rich text editor field
** Use ckeditorType command 
[Link to ckeditortype](ckeditorType.js)
cy.ckeditorType('#edit-body-0-value', 'string of text')

* Create a Paragraph
cy.visit('/node/123/edit');

cy.get('.add-paragraph-button').click();

cy.get('#edit-paragraph-field-name').type('My Paragraph Name');
// Fill in other paragraph fields here
cy.get('#edit-submit').click();

* Preview a node
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
// Need to test and validate this example code
cy.visit('/node/123/edit');

// Click on xml sitemap tab dropdown 
cy.get('.sitemap-settings-details summary').click();

//click on dropdown tabs for sitemap
cy.get('#edit-xmlsitemap-include').click();

// Select dropdown tab option
cy.get('#your-dropdown-element').select('Option Text');

// Save changes to node
cy.get('#edit-submit').click();

* Uploading a file 
[Link to uploadFile](uploadFile.js)
cy.uploadFile()

* Choosing a file from a media library
[Link to mediaLibrarySelect](mediaLibrarySelect.js)
cy.mediaLibrarySelect()

* Add file from media library
[Link to mediaLibraryAdd](mediaLibraryAdd.js)
cy.mediaLibraryAdd()

* Change Revision state
// Changes revision state to published
cy.visit('/node/1/edit');
cy.get('#edit-revision-state').as('revisionStateField');
cy.get('@revisionStateField').select('published');
cy.get('#edit-form').submit();
cy.get('#revision-state').should('contain', 'published');

* Add to a menu 
// Visit content type edit page
cy.visit('/admin/structure/types/manage/blank')
cy.get('#edit-menu-settings').as('menuSettingsFieldset');
cy.get('@menuSettingsFieldset').find('#edit-menu-enabled').as('menu');
cy.get('@menu').check();
cy.get('#edit-submit').click();

* Schedule a publishing time
cy.visit('node/add/article');
cy.get('#edit-title-0-value').type('My Article Title');
cy.get('#edit-scheduling-options').click();
cy.get('#edit-publish-on').type('2023-12-31 00:00:00');
cy.get('#edit-submit').click();
cy.get('#scheduled-publishing-time').should('contain', '2023-12-31 00:00:00');

* Schedule an unpublishing time.
cy.visit('node/1/edit');
cy.get('#edit-scheduling-options').click();
cy.get('#edit-unpublish-on').type('2023-12-31 00:00:00');
cy.get('#edit-submit').click();
cy.get('#scheduled-unpublishing-time').should('contain', '2023-12-31 00:00:00');

* Write a revision log message
cy.visit('node/1/edit');
cy.get('#edit-revision-information').click();
cy.get('#edit-revision-log-0-value').type('This is a revision log message.');
cy.get('#edit-submit').click();
cy.get('#revision-log-message').should('contain', 'This is a revision log message');


