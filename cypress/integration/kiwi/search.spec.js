/// <reference types="cypress" />

describe('KIWI page tests', () => {
    beforeEach(function () {
    //na stranke si nastavime aby bol "check with booking"
    //v local storage hned odskrtnuty
    window.localStorage.setItem('bookingcom_extension_default', 'false')
    //nastavanie Cookie,aby bol test bez nich
    cy.setCookie('__kwc_agreed', 'true')
    //cy.setCookie('preferred_currency', 'NOK')
    //otvorím stránku
    cy.visit('https://www.kiwi.com')
    })


it('display explore button if no destination is chosen',() => {
    //najdem explore button
    cy.get('[data-test=LandingSearchButton]')
    //overim jeho text a overim ze je enabled
        .should('have.text', 'Explore')
        .should('not.be.disabled')
})


it.only('navigates to tiles page when user clicks on eplore button', () => {
        cy.get('[data-test="LandingSearchButton"]').click()
        cy.get('[data-test="AggregateResultsWrapper"]')
            .find('h2')
            .should('contain.text', 'Trending destinations')
         cy.url() 
            .should('include', '/search/tiles') 
            .and('include', '/anywhere')    
})


it('should currency verification is displayed correctly', () => {
    cy.get('[data-test=RegionalSettingsButton]')
        .click()
    cy.get('[data-test=CurrencySelect]')
        .select('Norwegian krone - NOK')
    cy.contains('Done')
        .click()
    cy.get('[data-test=SearchFieldItem-destination]')
        .find('input')
        .type('Oslo')
    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .contains('Oslo')
        .click()
    cy.get('[data-test="LandingSearchButton"]')
        .contains('Search')
        .click()
        .wait(2000)
    cy.get('[data-test="ResultCardPrice"]')
        .should('contain.text','kr')
})


it('should search button not by disabled', () => {

    cy.get('[data-test=PlacePickerInputPlace]')
    .click ()
    cy.get('[data-test=PlacePickerRowCheckbox]')
    .click()
    cy.get('[data-test=PlacePickerInput-origin]')
    .should('not.be.disabled')
})

it('menu cookies', () => {
        cy.get('[data-test=SearchFieldItem-destination]')
        .find('input')
        .type('Oslo')
    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .contains('Oslo')
        .click()
    cy.get('[data-test="LandingSearchButton"]')
        .contains('Search')
        .click()
        .wait(2000)
    cy.get('[data-test="ResultCardPrice"]')
        .should('contain.text','kr')
})
})

