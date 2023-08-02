// Examples:
// cy.login();  // Logins as the default testing user.
// cy.login('username', 'password'); // login as a specific user.

Cypress.Commands.add('login', (usernameParam = '', password = '') => {
    cy.visit('/user/logout')
    cy.visit('/user/login')
    let username = '';
    let default_user = false;
    if (usernameParam === '' && password === '') {
      username = 'cypress';
      default_user = true;
    }
    else {
      username = usernameParam;
    }

    if (default_user) {
        cy.get('#edit-name').type(username);
        cy.get('#edit-pass').type('cypress');
    }
    else {
        cy.get('#edit-name').type(username);
        cy.get('#edit-pass').type(password);
    }

    // Login.
    cy.get('.form-submit').click();
    cy.wait(500) // Wait for the UI to catch up.

    // Check user page loads.
    cy.get('.page-title').contains(username)
    cy.get('main').contains('Member for')
})
