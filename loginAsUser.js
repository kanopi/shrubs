/**
 * Custom Cypress command to log in as a specific Drupal user.
 * 
 * Usage: cy.loginAsUser('admin')
 * 
 * This command uses Drush to generate a one-time login link for the specified user
 * and automatically visits that link to authenticate the session. It depends on
 * the 'drush' custom command to execute Drush commands from within Cypress tests.
 * 
 * @param {string} username - The username of the Drupal user to log in as
 */
Cypress.Commands.add('loginAsUser', (username) => {
  cy.drush(`uli --name=${username}`)
  cy.get('@drushOutput').then((link) => {
    cy.visit(link)
  })
})
