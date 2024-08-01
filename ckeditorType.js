/**
 * Set the value set in a CKEditor instance.
 *
 * Selector: The wrapping selector of the textfield form and searches within it for the ckEditor instance.
 * Content: A string.
 *
 * Based on:
 * https://medium.com/@nickdenardis/getting-cypress-js-to-interact-with-ckeditor-f46eec01132f
 * https://ckeditor.com/docs/ckeditor5/latest/support/faq.html#how-to-get-the-editor-instance-object-from-the-dom-element
 *
 * Examples:
 * cy.ckeditorSet('#field_body-wrapper', 'This is a string of content');
 * If the Summary is exposed by default, you need to find the second CKEditor:
 * cy.ckeditorType('#edit-body-wrapper .form-item--body-0-value', 'This is a string of content');
 */
Cypress.Commands.add("ckeditorType", (selector, content) => {
  cy.document().then((doc) => {
    const updatedSelector = selector + ' .ck-editor__editable';
    const domEditableElement = doc.querySelector( updatedSelector );
    const editorInstance = domEditableElement.ckeditorInstance;
    editorInstance.setData( content );
  })
});
