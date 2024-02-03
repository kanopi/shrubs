/**
 * Open a media browser modal and uploads a new file and selects it.
 *
 * Files should be in the 'fixtures' folder.
 *
 * Type is optional; can be: "audio", "video", "remote-video", "file", "image"
 * This is for media browsers that allow for different options.
 *
 * Examples:
 * cy.mediaLibraryAdd('#field_media_assets-media-library-wrapper', 'sample.png');
 * cy.mediaLibraryAdd('#field_media_assets-media-library-wrapper', 'sample.mp3', 'audio');
 */
Cypress.Commands.add("mediaLibraryAdd", (selector, fileName, type="") => {
  // Create a unique variable name for the ajax listener.  Cypress does not like it being reused.
  const mediaNodeEditAjax = 'mediaNodeEditAjax' + selector + Math.random();
  cy.intercept('POST', '/node/*/**').as(mediaNodeEditAjax)
  cy.get(selector).within(() => {
    cy.get('input[value="Add media"]').click();
    cy.wait('@'+mediaNodeEditAjax).its('response.statusCode').should('eq', 200)
  });

  const mediaLibraryAjax = 'mediaLibraryAjax' + selector + Math.random();
  cy.intercept('POST', '/media-library**').as(mediaLibraryAjax)

  // Get the media modal and add files.
  cy.get('.media-library-widget-modal').within(($modal) => {
    // Check if we need to select media type
    if ($modal.find('.media-library-menu').length) {
      if (type.length > 0) {
        const buttonClass= ".media-library-menu-" + type
        cy.get(buttonClass).click();
        cy.wait('@' + mediaLibraryAjax).its('response.statusCode').should('eq', 200)
      }
    }

    // Upload the file.
    cy.get('input[type=file]').selectFile('cypress/fixtures/' + fileName);
    cy.wait('@' + mediaLibraryAjax).its('response.statusCode').should('eq', 200)


    // Basic check if the file is an image so we know if we have to add some alt tags.
    if (fileName.includes(".png") || fileName.includes(".jpg")) {
      cy.get('.media-library-add-form').contains('Alternative text').next().type('alt text');
    }

    // Select the uploaded file.
    cy.get('.form-actions button').contains('save', { matchCase: false }).click()
    cy.wait('@' + mediaLibraryAjax).its('response.statusCode').should('eq', 200)

    // Insert from media library
    cy.get('.form-actions button').contains('insert', { matchCase: false }).click()
    cy.wait('@' + mediaLibraryAjax).its('response.statusCode').should('eq', 200)
  })

  // Wait for original node edit form field to update with media library selection.
  cy.wait('@'+mediaNodeEditAjax).its('response.statusCode').should('eq', 200)
  cy.wait(500)
});
