// Examples:
// cy.drush('cr');
// cy.drush('status');

Cypress.Commands.add('drush', (command, options = {}) => {

  let exec_command = '';

  if (Cypress.env('DRUSH_IS_DOCKSAL')) {
    exec_command = 'fin drush '  + command;
  }

  if (Cypress.env('DRUSH_IS_LANDO')) {
    exec_command = 'lando drush '  + command;
  }

  if (Cypress.env('DRUSH_IS_DDEV')) {
    exec_command = 'ddev drush '  + command;
  }

  // In the format of PANTHEON_SITE_ID.ENVIRONMENT_ID
  if(Cypress.env('DRUSH_IS_PANTHEON')) {
    // Passing URI as well because drush will return HTTP links by default and not HTTPS which can cause tests to fail.
    exec_command = 'ssh -T ' + Cypress.env('DRUSH_IS_PANTHEON') + '@appserver.' + Cypress.env('DRUSH_IS_PANTHEON') + '.drush.in -p 2222 -o "StrictHostKeyChecking=no" -o "AddressFamily inet" "drush --uri=' + Cypress.env('CYPRESS_BASE_URL') +  ' ' + command + '"';
  }

  cy.exec(exec_command, options).then((result) => {
    cy.log(result.stdout);
    cy.wrap(result.stdout).as('drushOutput');
  })
})
