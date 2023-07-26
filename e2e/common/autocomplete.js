// Examples:
// cy.autocomplete('[data-drupal-selector="edit-field-episode-show-0-target-id"]', 'showName');  // Logins as the default testing user.
Cypress.Commands.add("autocomplete", (selector, content) => {
  cy.get(selector).type(content).then(($input) => {
    cy.get('.ui-autocomplete:visible a:first').click();
  });
});
