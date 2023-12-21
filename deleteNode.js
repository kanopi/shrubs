// Examples:
// cy.deleteNode('Title of node to delete');

Cypress.Commands.add('deleteNode', (title) => {

  // Visit the content page.
  cy.visit('/admin/content')

  // Search for the content by passed title.
  cy.get('#edit-title').type(title);
  cy.get('#edit-submit-content').click();
  cy.wait(500);

  // Grab the table row based on title and click the delete button.
  cy.get(`a:contains("${title}")`).closest('tr').find('.delete a').contains('Delete').click({ force: true });

  // Create a unique variable name for the ajax listener.  Cypress does not like it being reused.
  const deleteModalAjax = 'deleteModalAjax' + '#edit-delete--2' + Math.random();
  cy.intercept('POST', '/media-library**').as(deleteModalAjax)

  // Get the delete modal and delete the node.
  cy.get('.ui-dialog-buttonpane').within(($modal) => {
    // Get the delete button in the modal and click.
    cy.get('.button').contains('Delete', { matchCase: false }).click();
  })
})
