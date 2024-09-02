describe('Testes API - Suíte de testes endpoint deIeteCIient/(id)', () => {

/* Variáveis */

const endpointAddClient = '/addClient';
const endpointDeleteClient = '/deleteClient';

/* Cenários de testes */

it('CT001— Teste de exclusão bem-sucedida', () => {
  // DADO que possuo o ID de um cadastro
  cy.bodyNewClient().then((novoCadastro) => {

    cy.api({
      method: 'POST',
      url: endpointAddClient,
      body: novoCadastro,
    }).then((response) => {
      const idCadastro = response.body.id;

  // QUANDO realizar uma requisição do tipo DELETE informando o ID do cadastro no endpoint
      cy.api({
        method: 'DELETE',
        url: `${endpointDeleteClient}/${idCadastro}`,
      }).then((response) => {
  
  // Então o sitema deve retornar 200
        expect(response.status).to.eq(200);
  // E apresentar a mensagem "Cliente excluído com sucesso!"
        expect(response.body.message).to.eq('Cliente excluído com sucesso!')
      
        })

    })

  })

})

it('CT002 — Teste de cliente não encontrado', () => {
  // DADO que possuo o ID incorreto de um cadastro

  // QUANDO realizar uma requisição do tipo DELETE informando o ID do cadastro no endpoint
    cy.api({
      method: 'DELETE',
      url: `${endpointDeleteClient}/1111`,
      failOnStatusCode: false
    }).then((response) => {
  
  // Então o sitema deve retornar 404
      expect(response.status).to.eq(404);
  // E apresentar a mensagem "Cliente não encontrado."
      expect(response.body.message).to.eq('Cliente não encontrado.')

  })

})

it('CT003 — Teste de exclusão sem ID - Issue #4', () => {
  // DADO que não possuo o ID de um cadastro

  // QUANDO realizar uma requisição do tipo DELETE sem informar o ID do cadastro no endpoint
    cy.api({
      method: 'DELETE',
      url: `${endpointDeleteClient}/`,
      failOnStatusCode: false
    }).then((response) => {
  
  // Então o sitema deve retornar 404
      expect(response.status).to.eq(404);
  // E apresentar a mensagem de erro indicando que não é possível deletar.
      expect(response.body.message).to.eq('Não é possível deletar')

  })

})















});
