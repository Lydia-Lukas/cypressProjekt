/// <reference types="cypress" />

describe('GymBeam tests', () => {

beforeEach(function() {
    cy.setCookie('CookieConsent','{stamp:%27slD2SYMM9kdib07vek+iBxCFczI612FUT/RJnX35xi0tSD0BTSE6ew==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1642848679173%2Cregion:%27sk%27}')
    cy.visit('https://gymbeam.sk/')
    cy.setCookie('_hjDonePolls','766561%2C766561')
})



it('find product and check if there is price and btn be enabled', () => {
    
    cy.wait(8000)
    cy.get('#search').click()
        .type('protein{enter}')

    cy.wait(8000)
    cy.get('#maincontent')
        .contains('Proteíny pre ženy')
        .click()
    cy.get('#maincontent')
        .find('h1')
        .should('contain.text','Proteíny pre ženy')
    cy.get('#amasty-shopby-product-list')
        .find('[data-role="tocart-form"]')
        .wait(8000)
        .first().click()
    cy.get('#quick-view-content')
        .should('not.be.empty')
        .should('contain.text','€')
    cy.get('#product-addtocart-button')
        .should('be.enabled')
})
})
