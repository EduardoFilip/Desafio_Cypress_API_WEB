describe('Testes API - Suíte de testes endpoint updateClient/(id)', () => {

/* Variáveis */

const endpointAddClient = '/addClient';
const endpointupdateClient = '/updateClient';


/* Cenários de testes */

it('CT001— Teste de atualização bem-sucedida', () => {
  // DADO que possuo o ID de um cadastro
  cy.bodyNewClient().then((novoCadastro) => {

    cy.api({
      method: 'POST',
      url: Cypress.env('baseUrlApi') + endpointAddClient,
      body: novoCadastro,
    }).then((response) => {
      const idCadastro = response.body.id;
      
  // QUANDO realizar uma requisição do tipo PUT informando o ID do cadastro no endpoint
  // E atualizando alguns campos

    novoCadastro.nome = 'testeAtualizarNome';

      cy.api({
        method: 'PUT',
        url: Cypress.env('baseUrlApi') + endpointupdateClient + '/' + idCadastro,  
        body: novoCadastro, 
      }).then((response) => {
  
  // Então o sitema deve retornar 200
        expect(response.status).to.eq(200);
  // E apresentar a mensagem "Cliente atualizado com sucesso!"
        expect(response.body.message).to.eq('Cliente atualizado com sucesso!')
      
      })

    })

  })

})

it('CT002 — Teste de cliente não encontrado - Issue #5', () => {
  // DADO que possuo o ID incorreto de um cadastro
  cy.bodyNewClient().then((novoCadastro) => {

    cy.api({
      method: 'POST',
      url: Cypress.env('baseUrlApi') + endpointAddClient,
      body: novoCadastro,
    }).then((response) => {

  // QUANDO realizar uma requisição do tipo PUT sem informar o ID do cadastro no endpoint
  // E atualizando alguns campos

    novoCadastro.nome = 'testeAtualizarNome';

      cy.api({
        method: 'PUT',
        url: Cypress.env('baseUrlApi') + endpointupdateClient + '/',  
        body: novoCadastro, 
        failOnStatusCode: false
      }).then((response) => {
  
  // Então o sitema deve retornar 404
        expect(response.status).to.eq(404);
  // E apresentar a mensagem "Cliente nõo encontrado"
        expect(response.body.message).to.eq('Cliente nõo encontrado')
      
      })

    })

  })

})

it('CT003 — Teste de atualização sem campos', () => {
  // DADO que possuo o ID incorreto de um cadastro
  cy.bodyNewClient().then((novoCadastro) => {

    cy.api({
      method: 'POST',
      url: Cypress.env('baseUrlApi') + endpointAddClient,
      body: novoCadastro,
    }).then((response) => {
      const idCadastro = response.body.id;

  // QUANDO realizar uma requisição do tipo PUT sem informar o ID do cadastro no endpoint
  // E atualizando alguns campos

    novoCadastro.nome = 'testeAtualizarNome';

      cy.api({
        method: 'PUT',
        url: Cypress.env('baseUrlApi') + endpointupdateClient + '/' + idCadastro,  
        failOnStatusCode: false
      }).then((response) => {
  
  // Então o sitema deve retornar 400
        expect(response.status).to.eq(400);
  // E apresentar a mensagem "Informe ao menos um campo para atualizar"
        expect(response.body.message).to.eq('Informe ao menos um campo para atualizar')
      
      })

    })

  })

})








})

