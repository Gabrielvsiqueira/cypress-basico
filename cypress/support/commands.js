Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('input[id="firstName"]').type('Gabriel Vitor')
    cy.get('input[id="lastName"]').type('Siqueira')
    cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail.com')
    cy.get('input[id="phone"]').type('998645631')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsofProduct', function(){
    cy.get('select').select('YouTube').should('have.value', 'youtube')
    cy.get('select').select('Mentoria').should('have.value', 'mentoria')
    cy.get('select').select(1).should('have.value', 'blog')
}) 