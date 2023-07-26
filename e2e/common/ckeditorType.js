// Examples:
// @TODO

// https://medium.com/@nickdenardis/getting-cypress-js-to-interact-with-ckeditor-f46eec01132f
// https://ckeditor.com/docs/ckeditor5/latest/support/faq.html#how-to-get-the-editor-instance-object-from-the-dom-element

// Takes the wrapping selector of the textfield form and searches within it for the ckEditor instance.
Cypress.Commands.add("ckeditorType", (selector, content) => {
  cy.document().then((doc) => {
    const updatedSelector = selector + ' .ck-editor__editable';
    const domEditableElement = doc.querySelector( updatedSelector );
    const editorInstance = domEditableElement.ckeditorInstance;
    editorInstance.setData( content );
  })
});
