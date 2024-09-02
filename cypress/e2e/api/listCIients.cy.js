describe('Testes API - Suíte de testes endpoint listClients', () => {

/* Variáveis */

const endpointlistClients = '/listClients';


/* Cenários de testes */

it('CT001— Teste de resposta bem-sucedida', () => {
  // DADO que possuo o endpoint "listClients" para consulta

  // QUANDO realizar uma requisição do tipo GET
  cy.api({
    method: 'GET',
    url: endpointlistClients,
  }).then((response) => {

    // ENTÃO a API deve retornar 200
    expect(response.status).to.eq(200);
    // E apresentar o body com a listagem de clientes
    expect(response.body).to.be.an('array').that.is.not.empty;
    // E com os parâmetros: ("id","nome","email","fone","fotoPerfil") preenchidos
    const clientes = response.body.slice(0, 50);
    for (const cliente of clientes) {
      expect(cliente.id).to.exist;
      expect(cliente.nome).to.exist;
      expect(cliente.email).to.exist;
      expect(cliente.fone).to.exist;
      expect(cliente.fotoPerfil).to.exist;
   
    }
  
  })

})

it('CT002 — Teste de validação dos campos - Issue #3', () => {
  // DADO que possuo o endpoint "listClients" para consulta

  // QUANDO realizar uma requisição do tipo GET
  cy.api({
    method: 'GET',
    url: endpointlistClients,
  }).then((response) => {

    // ENTÃO a API deve retornar 200
    expect(response.status).to.eq(200);
    // E apresentar o body com a listagem de clientes
    expect(response.body).to.be.an('array').that.is.not.empty;
    // E com os parâmetros: : ("id": "STRING", "nome": "STRING", "email": "STRING", "fone": "INTEGER", "fotoPerfil": "URL") corretos
    const clientes = response.body.slice(0, 5);
    for (const cliente of clientes) {
    expect(cliente.id).to.be.a('string');
    expect(cliente.nome).to.be.a('string');
    expect(cliente.email).to.be.a('string');
    expect(cliente.fone).to.be.a('number');
    expect(cliente.fotoPerfil).to.match(/^https?:\/\/[^\s$.?#].[^\s]*$/);
    }    
  })

})

it('CT003 — Teste de validação de endpoint', () => {
  // DADO que possuo o endpoint "listClientes" errado para consulta

  // QUANDO realizar uma requisição do tipo GET
  cy.api({
    method: 'GET',
    url: '/listClientes',
    failOnStatusCode: false
  }).then((response) => {

    // ENTÃO a API deve retornar 404
    expect(response.status).to.eq(404);   
  })

})




})