/**
 * ajaxClick()
 *
 * For clicks that trigger ajax calls, wrap in an intercept()/wait().
 *
 * selector:  A selector that will directly target an element actionable by click()
 * interceptPattern: The url pattern intercept() is looking to match against. Cypress intercept() documentaton: https://docs.cypress.io/api/commands/intercept
 * interceptMethod: The HTTP method type. Defaults to GET.
 *
 * I.E.
 */
// cy.ajaxClick("a[href='/find/product/management-console/2023.08/management-console-rpm-dependencies']", '/jsonapi/*/**')
// cy.ajaxClick(".media-library-menu-image", '/media-library**', 'POST')

Cypress.Commands.add('ajaxClick', (selector = '', interceptPattern = '', interceptMethod = 'GET') => {
  const alias = 'ajaxClick' + Math.random();
  cy.intercept(interceptMethod, interceptPattern).as(alias)
  cy.get(selector).click();
  cy.wait('@' + alias).its('response.statusCode').should('eq', 200)
})
