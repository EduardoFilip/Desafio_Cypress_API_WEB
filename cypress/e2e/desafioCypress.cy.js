describe('Desafio Cypress', () => {

/* Variáveis */

const endpointAddClient = '/addClient';


/* Cenários de testes */

it('CT001 - Criar uma nova conta com sucesso', () => {
  // DADO que possuo dados para um novo cadastro
  cy.bodyNewClient().then((novoCadastro) => {

    // QUANDO realizar uma requisição do tipo POST
    cy.api({
      method: 'POST',
      url: endpointAddClient,
      body: novoCadastro,
    }).then((response) => {

      // ENTÃO a API deve retornar 200
      expect(response.status).to.eq(200);
      // E apresentar a mensagem no body de "Cliente cadastrado com sucesso!"
      expect(response.body.message).to.eq('Cliente cadastrado com sucesso!');
      // E o ID retornado não pode ser vazio
      expect(response.body.id).to.not.be.empty;

    });

  });

});



})