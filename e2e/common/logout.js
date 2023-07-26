// Examples:
// cy.logout();  // Logs out user.

Cypress.Commands.add('logout', () => {
  cy.visit('/user/logout')
})
