/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', ()=> {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, ';
    beforeEach (function(){
        cy.visit('src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos de inputs obrigatórios e envia o formulário', () => {
        
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail.com')
        cy.get('input[id="phone"]').type('998645631')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail,com')
        cy.get('input[id="phone"]').type(998645631)
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

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
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()

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
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() //comando customizado que economiza duplicacao de codigo
        cy.get('.success').should('be.visible')
    })

    it('Usar o comando contains() para realizar os testes de login no botao de submit', function(){
        cy.get('div').contains('Nome').type('Gabriel Vitor') //exemplo de teste
        cy.contains('button', 'Enviar').click()
    })

    it('Seleciona um produto(Youtube) por seu texto',function(){
        cy.get('select').select('YouTube').should('have.value', 'youtube') //buscar o elemento pelo seu texto e verificar a sua tag value
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('select').select('mentoria').should('have.value', 'mentoria') //buscar pela tag value ao inves do texto e verificar com a tag value
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('select').select(1).should('have.value', 'blog') //colocar os elementos como um array e percorrer como um vetor buscando o indice
    })

    it('Testar o comando personalizado para a categoria Produto', function(){
        cy.fillMandatoryFieldsofProduct()
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('[type="radio"][value = "feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
       cy.get('[type="radio"]').should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
    })

  it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('#email-checkbox').check()
        cy.get('#phone-checkbox').check()
        cy.get('#phone-checkbox').uncheck()
    })

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    })
    }) 
    
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    })
    }) 

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    })
    })
})
