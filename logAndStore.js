Cypress.Commands.add("logAndStore", (message) => {
  if (!Cypress.env("logMessages")) {
    Cypress.env("logMessages", []);
  }

  cy.log(message);
  Cypress.env("logMessages").push(message);
});
