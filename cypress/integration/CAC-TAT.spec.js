/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', ()=> {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, ';
    beforeEach (function(){
        cy.visit('src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail.com')
        cy.get('input[id="phone"]').type('998645631')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type=submit]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail,com')
        cy.get('input[id="phone"]').type('998645631')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type=submit]').click()

        cy.get('.error').should('be.visible')
    })

    it('testar se o campo telefone nao recebe uma string', function(){
        cy.get('input[id="phone"]')
        .get('abc')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail,com')
        cy.get('input[id="phone"]').type()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Gabriel Vitor').should('have.value', 'Gabriel Vitor')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').type('Siqueira').should('have.value', 'Siqueira')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').type('gabrielvitorsiqueira53@gmail,com').should('have.value', 'gabrielvitorsiqueira53@gmail,com')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').type('998645631').should('have.value', '998645631')
        cy.get('#phone').clear().should('have.value', '')
        cy.get('#open-text-area'). type(longText). should('have.value', longText)
        cy.get('#open-text-area').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type=submit]').click()
        cy.get('#error').should('be.visible ')
    })

    it.only('', function(){

    })

  })