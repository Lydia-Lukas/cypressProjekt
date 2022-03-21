/// <reference types="cypress" />


it('should by calculate total income', () => {
    //otvorit stranku
    cy.visit('/savingscalculator.php')
    //zvolit fond
    cy.get('#fundSelect').select('Tom & Jerry corp')
    //zadat kolko chcem vlozit
    cy.get('#oneTimeInvestmentInput').type(10000)
    //zadat pocet rokov
    cy.get('#yearsInput').type(10)
    //klikneme na tlacidlo calculate
    //cy.get('[data-test=calculate]').click()
    cy.contains('Calculate').click()
    //overime ze total income nie je prazdne a ze obsahuje "kr" ako menu
    cy.get('div.result').within( () => { //metóda within nam umozni sa pohybovat v ramci elementu pre kazdy test
    cy.get('div')
        .first()
        .find('p')
        .should('contain.text', 'kr')
        .should('not.be.empty')
        //vytiahnem text elementu
        .invoke('text').then(text => {
            cy.log(text)
            //urobím premennú a očistím ju od textu
            let income = text.replace('kr','')
            cy.log(income)
            income = income.replace(' ', '')
            cy.log(income)
            //prekonvertujem na float alebo čo potrebujem
            income = parseFloat(income)
            cy.log(income)
            //čo očakávam
            expect(income).to.be.greaterThan(2000)
            })
     //overime interest income nie je prazdny a obsahuje kr ako menu
    cy.get('div')
        .eq('1')   //vyhlada podla poradia elementu
        .find('p')
        .should('not.be.empty')
        .should('contain.text', 'kr')
    })
})

it('display correct email in savings modal', () => {
    const investmentData = {
        email: 'lylu@gmail.com',
        fund: 'Tom & Jerry corp',
        investment: 15000,
        years: 15
    }

    cy.visit('/savingscalculator.php')
    //cy.get('#fundSelect').select(investmentData.fund)
    selectFund(investmentData.fund)
    cy.get('#oneTimeInvestmentInput').type(investmentData.investment)
    cy.get('#yearsInput').type(investmentData.years)
    cy.get('#emailInput').type(investmentData.email)
    cy.get('[data-test=apply-for-saving]').click()

    cy.get('ul.saving-list')
        .find('div.saving-detail')
        .first()
        .contains('detail')
        .click()
    
    cy.get('div.modal-body')
        .contains('Contact')
        .find('span')
        .should('contain.text', investmentData.email)

})
 
// funkcia ppužitá v riadku 56
function selectFund(text) {
    cy.get('#fundSelect').select(text)
} 