// Examples:
// cy.login();  // Logins as the default testing user.
// cy.login('username', 'password'); // login as a specific user.

Cypress.Commands.add('login', (usernameParam = '', password = '') => {
  cy.logout();
  cy.visit("/user/login");
  let username = "";
  let default_user = false;
  if (usernameParam === "" && password === "") {
    username = "cypress";
    default_user = true;
  } else {
    username = usernameParam;
  }

  if (default_user) {
    cy.get("form.user-login-form #edit-name").type(username);
    cy.get("form.user-login-form #edit-pass").type("cypress");
  } else {
    cy.get("form.user-login-form #edit-name").type(username);
    cy.get("form.user-login-form #edit-pass").type(password);
  }

  // Login.
  cy.get("form.user-login-form .form-submit").click();
  cy.wait(500); // Wait for the UI to catch up.

  // Check user session cookie is set after logging in.
  cy.getCookies()
    .should("have.length", 1)
    .then((cookies) => {
      expect(cookies[0].name).to.include("SESS");
    });
})
