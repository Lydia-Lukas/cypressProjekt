/// <reference types="cypress" />

it('infant cannot add baggage', () => {
    //ARANGE = som na stránke bookingu
    window.localStorage.setItem('bookingcom_extension_default', 'false')
    //nastavanie Cookie,aby bol test bez nich
    cy.setCookie('__kwc_agreed', 'true')
    //otvorím stránku
    cy.visit('https://www.kiwi.com')

const destination = 'Wellington'
cy.get('[data-test=SearchFieldItem-destination]')
    .find('input')
    .type(destination)
cy.get('[data-test="PlacepickerModalOpened-destination"]')
    .contains(destination)
    .click()
cy.get('[data-test="LandingSearchButton"]')
    .click()
    .wait(2000)
cy.get('[data-test="ResultCardWrapper"]' , { timeout: 10000})
    .should('be.visible')
    .first()
    .find('[data-test="BookingButton"]')
    .click()
//ACT = zvolim zo selectu ze som infant
cy.get('[data-test="passenger-category-select"]')
     .select('Infant (under 2 years)')
     .should('have.value', 'infant')
//ASSERT = overím že neviem pridať baggage
cy.get('[data-test="BaggagePickerNewDesign-EmptyOption"]')
     .should('contain.text', 'Checked baggage is not available for infant passengers.')
     
})



it.only('infant cannot add baggage', () => {
//ARANGE
    cy.setCookie('__kwc_agreed', 'true')
//odoslem request na backend s poziadavkou najdenia letov
    cy.request('https://api.skypicker.com/flights?flyFrom=VIE&to=WLG&partner=cypress&v=3')
        .then(response => {
         //cy.log(response)
         //cy.log(response.body)
         //cy.log(response.body.data)
         //cy.log(response.body.data[0]) 
         //(toto je cesta ako sa dostanem napr. k prvemu vyhladanemu letu)
         const flights = response.body.data  //z odpovede vytiahnem zoznam letov
         expect(flights, 'Check number of flights').to.have.length.greaterThan(0)  //overim, ze je dostupny aspon jeden let
         const flightInfo = flights[0]  //vytiahnem si len prvy-nulty let    
         cy.visit('https://www.kiwi.com/en/booking?token=' + flightInfo.booking_token)  //otvorim stranku z danym letom
    })

 //ACT = zvolim zo selectu ze som infant
     cy.get('[data-test="passenger-category-select"]')
         .select('Infant (under 2 years)')
         .should('have.value', 'infant')
 //ASSERT = overím že neviem pridať baggage
    cy.get('[data-test="BaggagePickerNewDesign-EmptyOption"]')
        .should('contain.text', 'Checked baggage is not available for infant passengers.')
     
 })
