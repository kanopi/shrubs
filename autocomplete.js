/**
 * Fills an autocomplete field
 *
 * Works best when not doing an extact match.
 *
 * Examples:
 * cy.autocomplete('[data-drupal-selector="edit-field-episode-show-0-target-id"]', 'showName');  // Select a item from an autocomplete field.
 */
Cypress.Commands.add("autocomplete", (selector, content) => {
  // Create a unique variable name for the ajax listener.  Cypress does not like it being reused.
  const autoComplete = 'autoComplete' + selector + Math.random();
  cy.intercept('GET', '/entity_reference_autocomplete/**').as(autoComplete)
  cy.get(selector).clear().type(content).then(($input) => {
    cy.wait('@' + autoComplete).its('response.statusCode').should('eq', 200)
    cy.get('.ui-autocomplete:visible a:first').click();
  });
});
