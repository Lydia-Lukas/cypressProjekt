describe('Gosslingator Test', () => {

beforeEach(function() {
    //cy.log('bezim pred kazdym testom!')
    cy.visit('/gosslingator.php')    
  });


it('should display add ryan button', () => {
    // 1. otvorim stranku
    // 2. najdem tlacitko add ryan
    // 3. overim ze tlacitko je zobrazene
    cy.get('button#addRyan')
    .should('be.visible')
    .should('have.text', 'Ryan!')
  })

it('should add one ryan',()=>{
    cy.get('button#addRyan').click()
    cy.get('#ryanCounter')
        .should('have.text', '1')
    cy.get('div.ryan-counter h3')
        .should('have.text', 'ryan')
    cy.get('img')
        .should('be.visible')
        .should('have.length',1)
})

it('should display 0 ryans on page open', () => {
    cy.get('#ryanCounter')
        .should('be.visible')
        .should('have.text', '0')
    cy.get('div.ryan-counter h3')
        .should('have.text', 'ryans')

    cy.get('img').should('have.length',0).should('not.exist')

})

it('should text remove ryan is correctly', () => {
    cy.get('#removeRyan').should('contain.text', 'Ryan out!')
})

it('should disable remove ryan button on page open', () => {
    cy.get('#removeRyan').should('be.disabled')
})

it('should display warning message by 50 ryans',() => {
    //50x klikne na Ryana
    for (let i = 0; i < 50; i++) {
        cy.get('#addRyan').click ()
      }  
      //Overiť hlášku
        cy.get('.tooManyRyans')
        .should('contain.text', 'number of ryans')
        .should('contain.text', 'is too damn')
        .should('contain.text', 'high')        
    })
    
})


