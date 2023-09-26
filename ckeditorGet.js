/**
 * Get the value set in a ckeditor instance.
 *
 * Selector: The wrapping selector of the textfield form and searches within it for the ckEditor instance.
 * Based on:
 * https://medium.com/@nickdenardis/getting-cypress-js-to-interact-with-ckeditor-f46eec01132f
 * https://ckeditor.com/docs/ckeditor5/latest/support/faq.html#how-to-get-the-editor-instance-object-from-the-dom-element
 *
 * Examples:
 * const  content = 'some text';
 * cy.ckeditorType('#edit-body-wrapper', content);
 * cy.ckeditorGet('#edit-body-wrapper').should('contain', content)
 */
Cypress.Commands.add("ckeditorGet", (selector) => {
  cy.document().then((doc) => {
    const updatedSelector = selector + ' .ck-editor__editable';
    const domEditableElement = doc.querySelector( updatedSelector );
    const editorInstance = domEditableElement.ckeditorInstance;
    const ckeditorContent = editorInstance.getData();
    return ckeditorContent
  })
});
