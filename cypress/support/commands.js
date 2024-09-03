
// Biblioteca faker para geração de massa de testes
import { faker } from '@faker-js/faker';

/* Variáveis */

const ferramentasDisponiveis = [
  'Robot Framework',
  'Selenium WebDriver',
  'Cypress',
  'Appium',
  'Protractor'
];

const ferramentasSelecionadas = ferramentasDisponiveis.sort(() => 0.5 - Math.random()).slice(0, 2);


// Função para gerar dados completos de cliente - API
Cypress.Commands.add('bodyNewClient', () => {
  return {
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    fone: faker.phone.number(),
    fotoPerfil: faker.internet.url(),
    cep: faker.location.zipCode(),
    endereco: faker.location.streetAddress(),
    complemento: faker.lorem.text(5),
    pais: faker.location.country(),
    genero: faker.person.sex(),
    ferramentas: [ferramentasSelecionadas]
  };
});

// Função para criar uma nova conta - WEB

Cypress.Commands.add('newClientWeb', (email, senha) => { 

  cy.get("[href='/app/novaconta']").as('btn').click()
  cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/novaconta`)
  cy.get("input[type='email']").type(email + '@email.com')
  cy.get('#floatingPassword').type(senha)
  cy.get('button').contains('Criar conta').click()
  cy.wait(1000)
  cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app`)
  cy.get('button').contains('Acessar').should('be.visible')
  
})

Cypress.Commands.add('newClientFormWeb', (nomeCompleto, fone, email, cep, numResidencia, endereco, complemento) => {

  cy.get('a.nav-link').contains('Cadastrar Cliente').click()
  cy.get('.col-md-9 > .form-control').type(nomeCompleto)
  cy.get(':nth-child(2) > .row > :nth-child(1) > .form-control').type(fone)
  cy.get(':nth-child(2) > .row > :nth-child(2) > .form-control').type(email + '@email.com')
  cy.get(':nth-child(3) > .row > :nth-child(1) > .form-control').type(cep)
  cy.get(':nth-child(3) > .row > :nth-child(2) > .form-control').type(numResidencia)
  cy.get(':nth-child(4) > .row > :nth-child(1) > .form-control').type(endereco)
  cy.get(':nth-child(4) > .row > :nth-child(2) > .form-control').type(complemento)
  cy.get(':nth-child(3) > .form-control').select('Brasil')
  cy.get('input[name="genero"][value="masculino"]').check()
  cy.get('input[name="ferramenta"][value="cypress"]').check()
  cy.get('input[type="file"]#image-upload').selectFile('./cypress/fixtures/smile.jpg', { force: true })
  cy.get('button').contains('Salvar').click()
  cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
  cy.get('h1').contains('Gestão de Clientes').should('be.visible')

})

