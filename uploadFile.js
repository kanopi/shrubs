/**
 * Upload a file through a file field
 *
 * Files should be in the 'fixtures' folder.
 *
 * Examples:
 * cy.uploadFile('#file-field-wrapper', 'example.png');
 */
Cypress.Commands.add("uploadFile", (selector, fileName) => {
  const nodeUploadAjax = 'nodeUploadAjax' + selector + Math.random();
  cy.intercept('POST', '/node/add/**').as(nodeUploadAjax)
  cy.get(selector).within(() => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/' + fileName);
    cy.wait('@'+nodeUploadAjax).its('response.statusCode').should('eq', 200)
    cy.get('input[aria-required="true"]').type('required');
  });

});
