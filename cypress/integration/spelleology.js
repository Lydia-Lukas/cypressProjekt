/// <reference types="Cypress" />

describe('Fellowship test', () => {

it('Fellowship: it displays complete when all the points are used', () => {
    cy.visit('/fellowship.php')
    //TODO: zaklikni na stránke elementy s textom Frodo, Legolas, Gandalf, Aragorn
    //v ulohe som to spravila pre kazdeho jednotlivo,takto mam jednoduchy kod
    //ak potrebujem to isté pre jeden element
    const fellows = ['Frodo', 'Legolas', 'Gandalf', 'Aragorn']
    fellows.forEach(postava => cy.contains(postava).click())

    cy.get('.points-left')
        .find('h3')
        .should('have.text', 'Complete')
})
})


describe('Spelleology tests', () => {

        beforeEach(function() { 
            cy.visit('/spelleology.php')
        })

it('Spelleology: it displays last spell', () => {
    cy.get('#app')
    .find('li')
    .last()
    .click()
    //TODO: nájdi posledný spell element pomocou funkcie last() a otvor jeho detail
    cy.get('.modal-container')
      .find('.modal-header')
      .should('have.text', 'Wingardium Leviosa')
})

it('Spelleology: it displays 32 spell', () => {
    //TODO: nájdi spell element pomocou funkcie eq() a otvor jeho detail
    cy.get('#app')
    .find('li')
    .eq(32)
    .click()
    cy.get('.modal-container')
        .find('.modal-header')
        .should('have.text', 'Flipendo')
})
})