Cypress.Commands.add("logSummary", () => {
  const messages = Cypress.env("logMessages") || [];
  
  if (messages.length === 0) {
    cy.log("No log messages were stored.");
    return;
  }

  cy.log("Test run completed. Summary of cy.log messages:");
  messages.forEach((message) => {
    cy.log(`- ${message}`);
  });

  // Clear stored messages after logging the summary.
  Cypress.env("logMessages", []);
});
